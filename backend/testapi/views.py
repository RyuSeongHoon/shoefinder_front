from logging import exception
import random
import string
import pdb
from django.http import request

from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView, View
from rest_framework.response import Response 
from django.http.response import HttpResponse 

from .models import Test
from .serializers import TestSerializer
from django.core import serializers
from django.http import JsonResponse
from rest_framework.renderers import JSONRenderer


class TestViewSet(viewsets.ModelViewSet):
        
    queryset = Test.objects.all()
    # queryset = Test.objects.filter(sub_id=id)
    
    serializer_class = TestSerializer

def article_list(request, slug):
    queryset = Test.objects.filter(sub_id=slug).values()
    # queryset = serializers.serialize("json", Test.objects.filter(sub_id=slug))
    json = JSONRenderer().render(queryset)
    print(type(queryset),queryset)
    return HttpResponse(json)