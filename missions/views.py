from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Mission
from .serializers import MissionSerializer

class MissionListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        missions = Mission.objects.all()
        serializer = MissionSerializer(missions, many=True)
        return Response(serializer.data)
"""
class MissionListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "auth_header": request.META.get("HTTP_AUTHORIZATION"),
            "user": str(request.user),
        })
"""