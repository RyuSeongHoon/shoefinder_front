from django.urls import path, include 
# from . import views 
from .views import TestViewSet

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
    #path('', views.index), 
    path('test/',test_list), 
    path('test/<int:pk>',test_detail) 
]
