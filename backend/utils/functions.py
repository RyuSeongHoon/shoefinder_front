import os
import random
from urllib.request import urlretrieve
from uuid import uuid4

from django.core.files import File
from django.db.models import Max
from django.utils.deconstruct import deconstructible


@deconstructible
class PathAndRename(object):
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split(".")[-1]
        filename = "{}.{}".format(uuid4().hex, ext)
        return os.path.join(self.path, filename)


def get_random_object(model_class):
    max_id = model_class.objects.active().aggregate(max_id=Max("id"))["max_id"]

    if max_id is None:
        return False

    while True:
        pk = random.randint(1, max_id)
        obj = model_class.objects.filter(pk=pk).first()
        if obj:
            return obj


def get_remote_image(instance, image_url="https://source.unsplash.com/random"):
    result = urlretrieve(image_url)
    instance.image.save(".jpg", File(open(result[0], "rb")))
    instance.save()
