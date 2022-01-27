import logging

from rest_framework.views import exception_handler

logger = logging.getLogger(__name__)


def error_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        logger.warning(response.data)

        errors = {}
        for key, value in response.data.items():
            errors[key] = value

        response.data = {"errors": errors, "code": response.status_code}

    return response
