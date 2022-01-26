from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from utils.functions import PathAndRename

# Create your models here.

class Test(models.Model):
    sub_id = models.CharField(max_length=256, verbose_name="sub")
    shoe_id = models.CharField(max_length=256, verbose_name="브랜드12")
    shoe_name = models.CharField(max_length=256, verbose_name="신발명")
    shoe_brand = models.CharField(max_length=256, verbose_name="브랜드")
    shoe_size = models.CharField(max_length=256, verbose_name="사이즈")
    shoe_color = models.CharField(max_length=256, verbose_name="색깔")
    
    
    image = models.ImageField(
                        upload_to='shoe_images', blank=True, null=True)

    def __str__(self):
        return self.sub_id