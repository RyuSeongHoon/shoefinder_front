from django.db import models

from hampton.utils.choices import Status


class ActiveQuerySet(models.QuerySet):
    def active(self):
        return self.filter(status=Status.ACTIVE)
