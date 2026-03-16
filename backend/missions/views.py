from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from .models import Mission
from .serializers import MissionSerializer


class MissionListAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        missions = Mission.objects.all()
        serializer = MissionSerializer(missions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MissionDetailAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return Mission.objects.get(pk=pk)
        except Mission.DoesNotExist:
            return None

    def get(self, request, pk):
        mission = self.get_object(pk)
        if not mission:
            return Response({"error": "Mission not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MissionSerializer(mission)
        return Response(serializer.data)

    def put(self, request, pk):
        mission = self.get_object(pk)
        if not mission:
            return Response({"error": "Mission not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MissionSerializer(mission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        mission = self.get_object(pk)
        if not mission:
            return Response({"error": "Mission not found"}, status=status.HTTP_404_NOT_FOUND)

        mission.delete()
        return Response({"message": "Mission deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
