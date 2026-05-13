from django.contrib import admin
from .models import Topic, UserProgress


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "category",
        "order",
        "is_published",
        "created_at",
    )

    list_display_links = ("id", "title")
    search_fields = ("title", "category", "slug")
    list_filter = ("is_published", "category")
    ordering = ("order",)


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "topic", "completed")