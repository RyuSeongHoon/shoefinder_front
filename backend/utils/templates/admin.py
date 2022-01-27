from django.contrib import admin
from hampton.{{app_name}}.models import <model_name>


@admin.register(<model_name>)
class <model_name>Admin(admin.ModelAdmin):
    pass
