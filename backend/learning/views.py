from rest_framework import generics, permissions
from .models import Topic, UserProgress
from .serializers import TopicSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProgress

# Public topics (users)
class TopicListView(generics.ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        return Topic.objects.filter(is_published=True).order_by('order')


# Single topic
class TopicDetailView(generics.RetrieveAPIView):
    queryset = Topic.objects.filter(is_published=True)
    serializer_class = TopicSerializer


# Admin CRUD
class TopicCreateView(generics.CreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAdminUser]


class TopicUpdateView(generics.UpdateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAdminUser]


class TopicDeleteView(generics.DestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAdminUser]

@api_view(['GET'])
def next_topic(request, pk):
    try:
        current = Topic.objects.get(pk=pk)
        next_topic = Topic.objects.filter(order__gt=current.order).order_by('order').first()

        if not next_topic:
            return Response({"message": "No more topics"})

        serializer = TopicSerializer(next_topic)
        return Response(serializer.data)

    except Topic.DoesNotExist:
        return Response({"error": "Topic not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_topic(request, pk):
    user = request.user

    try:
        topic = Topic.objects.get(pk=pk)
    except Topic.DoesNotExist:
        return Response({"error": "Topic not found"}, status=404)

    progress, created = UserProgress.objects.get_or_create(
        user=user,
        topic=topic
    )

    progress.completed = True
    progress.save()

    return Response({"message": "Topic marked as completed"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def available_topics(request):
    user = request.user

    topics = Topic.objects.filter(is_published=True).order_by('order')
    unlocked = []

    for topic in topics:
        if topic.order == 1:
            unlocked.append(topic)
        else:
            previous_topic = Topic.objects.filter(order=topic.order - 1).first()

            if previous_topic:
                completed = UserProgress.objects.filter(
                    user=user,
                    topic=previous_topic,
                    completed=True
                ).exists()

                if completed:
                    unlocked.append(topic)

    serializer = TopicSerializer(unlocked, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def topic_status(request):
    user = request.user
    topics = Topic.objects.filter(is_published=True).order_by('order')

    data = []

    for topic in topics:
        locked = True

        if topic.order == 1:
            locked = False
        else:
            previous = Topic.objects.filter(order=topic.order - 1).first()

            if previous:
                completed = UserProgress.objects.filter(
                    user=user,
                    topic=previous,
                    completed=True
                ).exists()

                if completed:
                    locked = False

        data.append({
            "id": topic.id,
            "title": topic.title,
            "short_description": topic.short_description,
            "order": topic.order,
            "locked": locked
        })

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def continue_learning(request):
    user = request.user
    topics = Topic.objects.filter(is_published=True).order_by('order')

    for topic in topics:
        done = UserProgress.objects.filter(
            user=user,
            topic=topic,
            completed=True
        ).exists()

        if not done:

            if topic.order == 1:
                return Response({
                    "id": topic.id,
                    "title": topic.title,
                    "order": topic.order,
                    "message": "Continue Learning"
                })

            previous = Topic.objects.filter(order=topic.order - 1).first()

            if previous:
                prev_done = UserProgress.objects.filter(
                    user=user,
                    topic=previous,
                    completed=True
                ).exists()

                if prev_done:
                    return Response({
                        "id": topic.id,
                        "title": topic.title,
                        "order": topic.order,
                        "message": "Continue Learning"
                    })

    return Response({
        "message": "All topics completed"
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_progress(request):
    user = request.user

    topics = Topic.objects.filter(is_published=True).order_by('order')
    total_topics = topics.count()

    completed_topics = UserProgress.objects.filter(
        user=user,
        completed=True
    ).count()

    remaining_topics = total_topics - completed_topics

    progress_percent = 0
    if total_topics > 0:
        progress_percent = int((completed_topics / total_topics) * 100)

    next_topic = None

    for topic in topics:
        done = UserProgress.objects.filter(
            user=user,
            topic=topic,
            completed=True
        ).exists()

        if not done:
            next_topic = {
                "id": topic.id,
                "title": topic.title
            }
            break

    return Response({
        "total_topics": total_topics,
        "completed_topics": completed_topics,
        "remaining_topics": remaining_topics,
        "progress_percent": progress_percent,
        "next_topic": next_topic
    })