from django.db.models.expressions import Value
from rest_framework import serializers
from .models import Post
from contents.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['post_num', 'unq_id', 'shoe_brand', 'shoe_name', 'shoe_size', 'shoe_color']
    post_num = serializers.IntegerField()
    unq_id = serializers.CharField(max_length=256)
    shoe_brand = serializers.CharField(max_length=256)
    shoe_name = serializers.CharField(max_length=256)
    shoe_size = serializers.IntegerField()
    shoe_color = serializers.CharField()

