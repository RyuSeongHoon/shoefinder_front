import json
import jwt
import requests

from django.utils.functional import cached_property
from jwt.algorithms import RSAAlgorithm


class CognitoTokenError(Exception):
    pass


class CognitoTokenValidator:
    def __init__(self, pool_id, client_id, auth_flow):
        self.aws_user_pool_id = pool_id
        self.aws_app_client_id = client_id
        self.aws_auth_flow = auth_flow

    @cached_property
    def pool_url(self):
        return "https://cognito-idp.ap-northeast-2.amazonaws.com/%s" % (
            self.aws_user_pool_id,
        )

    @cached_property
    def _json_web_keys(self):
        response = requests.get(self.pool_url + "/.well-known/jwks.json")
        response.raise_for_status()
        json_data = response.json()
        return {key["kid"]: json.dumps(key) for key in json_data["keys"]}

    def _get_public_key(self, token):
        try:
            headers = jwt.get_unverified_header(token)
        except jwt.DecodeError as exc:
            raise CognitoTokenError(str(exc))

        jwk_data = self._json_web_keys.get(headers["kid"])

        if jwk_data:
            return RSAAlgorithm.from_jwk(jwk_data)

    def validate(self, token):
        public_key = self._get_public_key(token)

        if not public_key:
            raise CognitoTokenError("There is no JWK value...")

        try:
            jwt_data = jwt.decode(
                token,
                public_key,
                issuer=self.pool_url,
                algorithms=["RS256"],
            )
        except (jwt.InvalidCognitoTokenError, jwt.ExpiredSignature, jwt.DecodeError) as exc:
            raise CognitoTokenError(str(exc))

        return jwt_data
