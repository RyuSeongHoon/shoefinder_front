from django.contrib import admin
from .models import Test
# Register your models here.

admin.site.register(Test)



# @admin.register(Content)
# class ContentAdmin(admin.ModelAdmin, ThumbnailAdminMixin):
#     form = ContentForm
#     list_display = ['post_num', 'unq_id', 'shoe_brand', 'shoe_name', 'shoe_size', 'shoe_color']
#     #['image_tag', 'id', 'user', 'title', 'file_name', 'play_time', 'file_fps', 'file_frame', 'file_key',
#     #                'file_password', 'file_size', 'file_type', 'view_count', 'left_count']
#     list_display_links = ['post_num', 'unq_id']
#     list_filter = ['shoe_brand']

    # class Media:
    #     css = {
    #         'all': ('admin/css/admin.scss',),
    #     }
