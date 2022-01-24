from django.urls import path, include 
from . import views 

app_name = 'tests' 
urlpatterns = [ 
    #path('', views.index), 
    path('get/',views.get_api, name='get_api'), 
    path('post/', views.post_api, name='post_api') 
]
