from django.core.exceptions import ValidationError


def validate_image_size(image):
    file_size = image.size
    limit = 10
    if file_size > limit * 1024 * 1024:
        raise ValidationError(f"Max size of file is #{limit} MB")
