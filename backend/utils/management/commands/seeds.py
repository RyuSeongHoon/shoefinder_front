import importlib

from django.core.management import BaseCommand

from hampton.users.models import User
from hampton.utils.factories import PageFactory, UserFactory


class Command(BaseCommand):
    help = "Generate seed data"

    def handle(self, *args, **options):
        try:
            if not User.objects.filter(email="admin@example.com").exists():
                UserFactory(email="admin@example.com", is_superuser=True, is_staff=True)

            # PageFactory(slug="tos")
            # PageFactory(slug="privacy")
            # get_factory("CategoryFactory").create_batch(24)
            # get_factory("BrandFactory").create_batch(30)

            for model in [
                "Content"
            ]:
                get_factory(f"{model}Factory").create_batch(30)


            self.stdout.write(self.style.SUCCESS("SUCCESS"))
        except Exception as e:
            self.stdout.write(self.style.WARNING(str(e)))


def get_factory(class_name):
    m = importlib.import_module("hampton.utils.factories")
    c = getattr(m, class_name)
    return c
