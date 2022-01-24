from django.db.models.expressions import Value
from rest_framework import serializers
from .models import Test
from testapi.models import Test


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['shoe_name','shoe_brand', 'shoe_size', 'shoe_color']
    # shoe_brand = serializers.CharField(max_length=256)
    # shoe_name = serializers.CharField(max_length=256)
    # shoe_size = serializers.CharField()
    # shoe_color = serializers.CharField()
    # image = serializers.ImageField()

