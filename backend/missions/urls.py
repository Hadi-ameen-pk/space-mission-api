from django.urls import path
from .views import MissionListAPIView, MissionDetailAPIView

urlpatterns = [
    path("missions/", MissionListAPIView.as_view(), name="mission-list"),
    path("missions/<int:pk>/", MissionDetailAPIView.as_view(), name="mission-detail"),
]
