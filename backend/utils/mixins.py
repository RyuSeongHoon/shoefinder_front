from django.db import models
from django.db.models import F, Max
from django.utils.html import format_html


class BaseModelMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)


class PositionMixin(models.Model):
    position = models.PositiveIntegerField(db_index=True, default=0)

    class Meta:
        abstract = True
        ordering = ("position",)

    def get_ordering_queryset(self):
        return self.__class__.objects.all()

    @staticmethod
    def get_max_position(qs):
        existing_max = qs.aggregate(Max("position"))
        existing_max = existing_max.get("position__max")
        return existing_max

    def save(self, *args, **kwargs):
        if self.pk is None:
            qs = self.get_ordering_queryset()
            existing_max = self.get_max_position(qs)
            self.position = 0 if existing_max is None else existing_max + 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.position is not None:
            qs = self.get_ordering_queryset()
            qs.filter(position__gt=self.position).update(position=F("position") - 1)
        super().delete(*args, **kwargs)


class ThumbnailAdminMixin:
    readonly_fields = ("image_tag",)

    @staticmethod
    def thumb_image_tag(obj):
        return format_html(
            '<img src="{0}" style="object-fit:cover;width: 120px; height:120px;" />'.format(
                obj.image.url
            )
        )

    @staticmethod
    def image_tag(obj):
        if obj.image:
            return format_html(
                '<img src="{0}" style="max-width: 300px;" />'.format(obj.image.url)
            )
        else:
            return format_html(
                '<img src="/static/images/profile.png" style="max-width: 300px;" />'
            )
    image_tag.allow_tags = True
