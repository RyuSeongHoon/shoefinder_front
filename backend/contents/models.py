from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.translation import gettext_lazy as _
from utils.functions import PathAndRename
from utils.validators import validate_image_size
# Create your models here.
class Post(models.Model):
    post_num = models.IntegerField(help_text="Post Number", db_index=True, primary_key=True)
    unq_id = models.CharField(max_length=266,  blank=False, verbose_name="이메일")
    shoe_brand = models.CharField(max_length=256, blank=False, verbose_name="브랜드")
    shoe_name = models.CharField(max_length=256, verbose_name="신발명")
    shoe_size = models.IntegerField(verbose_name="사이즈")
    shoe_color = models.CharField(max_length=256, verbose_name="색깔")

    image = models.ImageField(
                        upload_to='%Y/%m/%d', blank=True, null=True)
 

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('컨텐츠')
        verbose_name_plural = _('컨텐츠(들)')
