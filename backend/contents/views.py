# from rest_framework import permissions
# from rest_framework.views import APIView
# from utils.pagination import InfiniteScrollPagination
# from rest_framework import status, viewsets
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from contents.models import Post
# from contents.serializers import PostSerializer
# from rest_framework.permissions import AllowAny
# from rest_framework.authentication import TokenAuthentication
# from django.db.models import Case, Value, When

import random
import string
import pdb

from django.shortcuts import render
from rest_framework import status 
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from django.http.response import HttpResponse 
from .models import Post 
from .serializers import PostSerializer
# from contents import serializers

@api_view(['GET'])
def get_api(request):
    posts = Post.objects.all()
    serialized_posts = PostSerializer(posts, many=True)
    return Response(serialized_posts.data)

@api_view(['POST'])
def post_api(request):
    print("1. 물을 넣는다.")
    if request.method == 'GET':
        print("2. 물이 끓으면 스프를 넣는다.")
        return HttpResponse(status=200)
        
    if request.method == 'POST':
        print("3. 후레이크를 첨가한다.")
        serializer = PostSerializer(data=request.data, many=True)
        print(serializer)
        if(serializer.is_valid()):
            print("4. 면을 넣는다.")
            serializer.save()
            return Response(serializer.data, status=200)
        print("5. 맛있게 먹는다.")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ContentViewSet(viewsets.ModelViewSet):
#     queryset = Content.objects.all().order_by('created_at').reverse()
#     pagination_class = InfiniteScrollPagination
#     permission_classes = (AllowAny, )
#     serializer_class = ContentSerializer

#     def list(self, request, *args, **kwargs):
#         user = self.request.user

#         try:
#             user
#             queryset = Content.objects.all().filter(user_id=self.request.user)
#         except:
#             queryset = Content.objects.none()
#             print('User is not defined')

#         return self._list(queryset)

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)

#         serializer.is_valid(raise_exception=True)

#         if serializer.is_valid():
#             serializer.save(
#                 file_password=''.join(random.choices(string.ascii_uppercase + string.digits, k=20)),
#                 user=self.request.user,
#                 left_count=10
#             )

#         headers = self.get_success_headers(serializer.data)
#         return Response(
#             serializer.data, status=status.HTTP_201_CREATED, headers=headers
#         )

#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()

#         serializer = self.get_serializer(instance)
#         return Response(serializer.data)

#     def destroy(self, request, *args, **kwargs):
#         instance = self.get_object()
#         instance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()

#         # if (instance.left_count > 0):
#         #     instance.left_count -= 1
#         #     instance.save()

#         # data = instance.left_count - 1
#         # return Response(data)

#     @action(detail=True)
#     def update_view_count(self, request, *args, **kwargs):
#         instance = self.get_object()

#         instance.view_count += 1
#         instance.save()

#         serializer = self.get_serializer(instance)
#         return Response(serializer.data)

#     @action(detail=False)
#     def retrieve_by_password(self, request):
#         file_password = request.GET.get('password')
#         content = Content.objects.filter(file_password=file_password).first()

#         serializer = self.get_serializer(content)
#         return Response(serializer.data)

#     @action(detail=True)
#     def check_authority(self, request, *args, **kwargs):
#         result = False
#         user = request.user
#         content = self.get_object()

#         if user.id != None:
#             if(user.id == content.user_id):
#                 result = True
#             elif(user.is_staff == True):
#                 result = True

#         return Response(result)

#     @action(detail=False)
#     def my(self, request):
#         user = request.user
#         queryset = Content.objects.all().filter(user_id=user.id)

#         return self._list(queryset)

#     def _list(self, queryset):
#         queryset = self.filter_queryset(queryset)
#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             return self.get_paginated_response(serializer.data)

#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)
