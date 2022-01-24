import random
import string
import pdb

from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from django.http.response import HttpResponse 
from .models import Test1
from .serializers import TestSerializer

# from contents import serializers

# @api_view(['GET'])
# def get_api(request):
#     posts = Test.objects.all()
#     serialized_posts = TestSerializer(posts, many=True)
#     return Response(serialized_posts.data)

# @api_view(['POST'])
# def post_api(request):
#     print(request)
#     print("1. 물을 넣는다.")
#     if request.method == 'GET':
#         print("2. 물이 끓으면 스프를 넣는다.")
#         return HttpResponse(status=200)
        
#     if request.method == 'POST':
#         print("3. 후레이크를 첨가한다.")
#         serializer = TestSerializer(data=request.data, many=True)
#         print(serializer)
#         if(serializer.is_valid()):
#             print("4. 면을 넣는다.")
#             print(serializer.data) 
#             serializer.save()
#             return Response(serializer.data, status=200)
#         print("5. 맛있게 먹는다.")
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test1.objects.all()
    serializer_class = TestSerializer
