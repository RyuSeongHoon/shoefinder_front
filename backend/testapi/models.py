from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from utils.functions import PathAndRename
# Create your models here.

class Test1(models.Model):
    shoe_name = models.CharField(max_length=256,null=True, blank=True, verbose_name="신발명")
    shoe_brand = models.CharField(max_length=256,null=True, blank=True, verbose_name="브랜드")
    shoe_size = models.CharField(max_length=256,null=True, blank=True, verbose_name="사이즈")
    shoe_color = models.CharField(max_length=256,null=True, blank=True, verbose_name="색깔")

    image = models.ImageField(
                        upload_to='%Y/%m/%d', blank=True, null=True)

    def __str__(self):
        return self.title

    # class Meta:
    #     verbose_name = _('테스트')
    #     verbose_name_plural = _('테스트(들)')