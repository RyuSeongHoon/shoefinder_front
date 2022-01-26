from django.urls import path, include
# from . import views 
from .views import TestViewSet, article_list
from rest_framework.routers import DefaultRouter


test_list = TestViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

# Blog detail 보여주기 + 수정 + 삭제
test_detail = TestViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [ 
    path('',test_list), 
    # path('<int:pk>/',test_detail),
    path('<slug:slug>/', article_list, name='test_details'),
]
