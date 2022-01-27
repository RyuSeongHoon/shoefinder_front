from django.db.models.expressions import Value
from rest_framework import serializers
from .models import Test


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['sub_id','id', 'shoe_name','shoe_brand', 'shoe_size', 'shoe_color', 'image']
        # fields = '__all__'
