from django.urls import path
from .views import MissionListAPIView, MissionDetailAPIView, register_user 

urlpatterns = [
    path("missions/", MissionListAPIView.as_view(), name="mission-list"),
    path("missions/<int:pk>/", MissionDetailAPIView.as_view(), name="mission-detail"),
    path('register/', register_user),
]
