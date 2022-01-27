from django.apps import apps
from django.conf import settings
from django.utils.encoding import smart_text
from django.utils.translation import ugettext as _

from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication, get_authorization_header

from hampton.utils.cognito_validator import CognitoTokenError, CognitoTokenValidator


class CognitoService(BaseAuthentication):
    def authenticate(self, request):
        jwt_token = self.get_jwt_token(request)

        if jwt_token is None:
            return None

        try:
            token_validator = self.get_token_validator(request)
            jwt_payload = token_validator.validate(jwt_token)
        except CognitoTokenError:
            raise exceptions.AuthenticationFailed()

        user = self.get_or_create_for_cognito(jwt_payload, request)
        return (user, jwt_token)

    def get_auth_model(self):
        auth_model = getattr(settings, "COGNITO_AUTH_MODEL", settings.COGNITO_AUTH_MODEL)
        return apps.get_model(auth_model)

    def get_jwt_token(self, request):
        auth = get_authorization_header(request).split()
        if not auth or smart_text(auth[0].lower()) != "bearer":
            return None

        if len(auth) == 1:
            msg = _("Invalid Authorization header. No credentials provided...")
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _(
                "Invalid Authorization header. Credentials string "
                "should not contain spaces..."
            )
            raise exceptions.AuthenticationFailed(msg)

        return auth[1]

    def get_token_validator(self, request):
        return CognitoTokenValidator(
            settings.COGNITO_POOL_ID,
            settings.COGNITO_CLIENT_ID,
            settings.COGNITO_AUTH_FLOW
        )

    def get_or_create_for_cognito(self, payload, request):
        AUTH_MODEL = self.get_auth_model()
        sub = payload['sub']

        try:
            return AUTH_MODEL.objects.get(uuid=sub)
        except AUTH_MODEL.DoesNotExist:
            pass
