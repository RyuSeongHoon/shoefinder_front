from rest_framework import viewsets
from hampton.{{app_name}}.models import Content
from hampton.{{app_name}}.serializers import ContentSerializer


class ContentViewSet(viewsets.ModelViewSet):
    serializer_class = ContentSerializer
    queryset = Content.objects.all()
