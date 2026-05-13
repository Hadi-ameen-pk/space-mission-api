from rest_framework import serializers
from .models import Post, Reply

class ReplySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'username', 'content', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'username', 'content', 'created_at', 'replies', 'likes_count']

    def get_likes_count(self, obj):
        return obj.likes.count()