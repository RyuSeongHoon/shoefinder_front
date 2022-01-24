from django.db.models.expressions import Value
from rest_framework import serializers
from .models import Test1


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test1
        fields = ['shoe_name','shoe_brand', 'shoe_size', 'shoe_color', 'image']
        # fields = '__all__'
