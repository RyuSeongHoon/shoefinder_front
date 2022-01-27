from pathlib import Path
from django.core.management import BaseCommand
import subprocess


class Command(BaseCommand):
    help = 'Generate base code'
    PROJECT_ROOT_PATH = Path(__file__).resolve(strict=True).parent.parent.parent.parent
    TEMPLATE_PATH = PROJECT_ROOT_PATH / 'utils' / 'templates'

    def add_arguments(self, parser):
        parser.add_argument('app_name', type=str)

    def handle(self, *args, **options):
        app_name = options["app_name"]
        app_path = self.PROJECT_ROOT_PATH / app_name

        if not app_path.exists():
            app_path.mkdir()
            try:
                subprocess.run([
                    'django-admin', 'startapp',
                    app_name, app_path,
                    '--template', self.TEMPLATE_PATH
                ])
            except Exception as e:
                self.stdout.write(self.style.ERROR(str(e)))
                return

            self.stdout.write(self.style.SUCCESS('SUCCESS'))
        else:
            self.stdout.write(self.style.ERROR('Dir exists'))
