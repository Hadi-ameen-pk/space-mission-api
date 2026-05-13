from django.urls import path
from .views import (
    TopicListView,
    TopicDetailView,
    TopicCreateView,
    TopicUpdateView,
    TopicDeleteView,
    next_topic,
    complete_topic,
    available_topics,
    topic_status,
    continue_learning,
    dashboard_progress
)

urlpatterns = [

    # Admin CRUD
    path('create/', TopicCreateView.as_view()),
    path('update/<int:pk>/', TopicUpdateView.as_view()),
    path('delete/<int:pk>/', TopicDeleteView.as_view()),

    # User Actions
    path('next/<int:pk>/', next_topic),
    path('complete/<int:pk>/', complete_topic),

    # Progress APIs
    path('available/', available_topics),
    path('status/', topic_status),
    path('continue/', continue_learning),
    path('dashboard-progress/', dashboard_progress),

    # Basic APIs LAST
    path('', TopicListView.as_view()),
    path('<int:pk>/', TopicDetailView.as_view()),
]


'''
{
  "title": "Black Hole",
  "slug": "black-hole",
  "description": "A black hole is a place where gravity is extremely strong.",
  "short_description": "Learn black holes simply",
  "video_url": "https://youtube.com/shorts/example",
  "image": "https://example.com/image.jpg",
  "distance": "27,000 light years",
  "category": "Space",
  "order": 1,
  "is_published": true
}

{
  "username": "admin",
  "password": "space@321"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc2Njk2MzM2LCJpYXQiOjE3NzY2OTI3MzYsImp0aSI6IjUwNzMxZmFiNjc5NTQzNzlhNGZkMzQ1MDliODU1NDI1IiwidXNlcl9pZCI6IjEifQ.LPz61iIbeCAlMtQbysjV1RzAfspsNKQyWL7IH6sxQf4
'''