from rest_framework import serializers

from hampton.{{app_name}}.models import Content


class ContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Content
