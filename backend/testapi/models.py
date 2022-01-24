from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.translation import gettext_lazy as _
from utils.functions import PathAndRename
# Create your models here.
class Test(models.Model):
    shoe_name = models.CharField(max_length=256, verbose_name="신발명")
    shoe_brand = models.CharField(max_length=256, blank=False, verbose_name="브랜드")
    shoe_size = models.CharField(max_length=256, verbose_name="사이즈")
    shoe_color = models.CharField(max_length=256, verbose_name="색깔")

    # image = models.ImageField(
    #     verbose_name="이미지"
    # )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('테스트')
        verbose_name_plural = _('테스트(들)')