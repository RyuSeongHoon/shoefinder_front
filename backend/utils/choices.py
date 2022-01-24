from django.db import models


class Status(models.IntegerChoices):
    ACTIVE = 0, "Active"
    DISABLED = 1, "Disabled"


class Location(models.IntegerChoices):
    TOP = 0, "Top"
    MIDDLE = 1, "Middle"

    @staticmethod
    def get_value(key):
        return Location[key.upper()]
