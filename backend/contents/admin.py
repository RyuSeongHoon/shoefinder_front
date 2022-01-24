from utils.mixins import ThumbnailAdminMixin
from django.contrib import admin
from contents.models import Post
from django.utils.safestring import mark_safe
from utils.mixins import ThumbnailAdminMixin
from django import forms

class ContentForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['post_num', 'unq_id', 'shoe_brand', 'shoe_name', 'shoe_size', 'shoe_color']
        #['id', 'title', 'file_name', 'play_time', 'file_fps', 'file_frame', 'file_key', 'file_size', 'file_type', 'file_password',
        #            'iframe_height', 'iframe_width', 'ds_url', 'view_count', 'left_count', 'image' ]
        # author = model.ForeignKey(
        #     User,
        #     models.SET_NULL,
        #     blank=True, null=True,
        # )



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
