from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def home(request):
    return render(request, 'front/pages/index.js')
    #return HttpResponse("Hello, world, You're at the home index.")