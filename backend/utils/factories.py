from hampton.users.models import User
import logging
import random
from random import randint

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.contenttypes.models import ContentType
from factory import (
    Faker,
    LazyAttribute,
    RelatedFactoryList,
    SelfAttribute,
    Sequence,
    fuzzy,
)
from factory.django import DjangoModelFactory

from hampton.home.models import Banner, Intro, Slogan
from hampton.images.models import Image
from hampton.items.models import Brand, Category, Item, SubCategory
from hampton.contents.models import Content
from hampton.pages.models import Faq, Notice, Page
from hampton.utils.choices import Location, Status
from hampton.utils.functions import get_remote_image

logging.getLogger("faker").setLevel(logging.ERROR)

PLAYTIME = ["50분", "55분", "56분", "1시간 10분", "1시간 20분"]
FILEFRAME = ["142", "160", "200"]
FILEFPS = ["19.32", "20.12", "21.11", "22.21"]
FILESIZE = ["10GB", "5GB", "4.8GB", "2.4GB"]

CATEGORY = [
    {"name": "인기", "name_en": "Best"},
    {"name": "상의", "name_en": "Top"},
    {"name": "아우터", "name_en": "Outer"},
    {"name": "바지", "name_en": "Pants"},
    {"name": "원피스", "name_en": "Onepiece"},
    {"name": "스커트", "name_en": "Skirt"},
    {"name": "가방", "name_en": "Bag"},
    {"name": "여성 가방", "name_en": "Women's bag"},
    {"name": "스니커즈", "name_en": "Sneakers"},
    {"name": "신발", "name_en": "Shoes"},
    {"name": "모자", "name_en": "Headwear"},
    {"name": "양말/레그웨어", "name_en": "Socks/Legwear"},
    {"name": "속옷", "name_en": "Underwear"},
    {"name": "선글라스/안경테", "name_en": "Eyewear"},
    {"name": "시계", "name_en": "Watch"},
    {"name": "스포츠/용품", "name_en": "Sports/Goods"},
    {"name": "골프용품", "name_en": "Golf goods"},
    {"name": "디지털/테크", "name_en": "Digital/Tech"},
    {"name": "액세서리", "name_en": "Accessory"},
    {"name": "쥬얼리", "name_en": "Jewelry"},
    {"name": "뷰티", "name_en": "Beauty"},
    {"name": "생활/취미/예술", "name_en": "Life"},
    {"name": "책/음악/티켓", "name_en": "Culture"},
    {"name": "반려동물", "name_en": "Pet"},
]

SUB_CATEGORY = [
    {"name": "반팔 티셔츠"},
    {"name": "데님 팬츠"},
    {"name": "캔버스/단화"},
    {"name": "코튼 팬츠"},
    {"name": "메신저/크로스 백"},
    {"name": "러닝화/피트니스화"},
    {"name": "슈트 팬츠/슬랙스"},
    {"name": "셔츠/블라우스"},
    {"name": "트레이닝/조거 팬츠"},
    {"name": "피케/카라 티셔츠"},
    {"name": "숏 팬츠"},
    {"name": "슬리퍼"},
    {"name": "전체"},
    {"name": "반팔 티셔츠"},
    {"name": "긴팔 티셔츠"},
    {"name": "민소매 티셔츠"},
    {"name": "셔츠/블라우스"},
    {"name": "피케/카라 티셔츠"},
    {"name": "맨투맨/스웨트셔츠"},
    {"name": "후드 티셔츠"},
    {"name": "니트/스웨터"},
    {"name": "기타 상의"},
    {"name": "전체"},
    {"name": "후드 집업"},
    {"name": "블루종/MA-1"},
    {"name": "레더/라이더스 재킷"},
    {"name": "트러커 재킷"},
    {"name": "슈트/블레이저 재킷"},
    {"name": "카디건"},
    {"name": "아노락 재킷"},
    {"name": "플리스/뽀글이"},
    {"name": "트레이닝 재킷"},
    {"name": "스타디움 재킷"},
    {"name": "환절기 코트"},
    {"name": "겨울 싱글 코트"},
    {"name": "겨울 기타 코트"},
    {"name": "롱 패딩/롱 헤비 아우터"},
    {"name": "숏 패딩/숏 헤비 아우터"},
    {"name": "패딩 베스트"},
    {"name": "베스트"},
    {"name": "사파리/헌팅 재킷"},
    {"name": "나일론/코치  재킷"},
    {"name": "기타 아우터"},
    {"name": "전체"},
    {"name": "데님 팬츠"},
    {"name": "코튼 팬츠"},
    {"name": "슈트 팬츠/슬랙스"},
    {"name": "트레이닝/조거 팬츠"},
    {"name": "숏 팬츠"},
    {"name": "레깅스"},
    {"name": "점프 슈트/오버올"},
    {"name": "기타 바지"},
    {"name": "전체"},
    {"name": "미니 원피스"},
    {"name": "미디 원피스"},
    {"name": "맥시 원피스"},
    {"name": "전체"},
    {"name": "미니스커트"},
    {"name": "미디스커트"},
    {"name": "롱스커트"},
    {"name": "전체"},
    {"name": "백팩"},
    {"name": "메신저/크로스 백"},
    {"name": "숄더백"},
    {"name": "토트백"},
    {"name": "에코백"},
    {"name": "보스턴/드럼/더플백"},
    {"name": "웨이스트 백"},
    {"name": "파우치 백"},
    {"name": "브리프케이스"},
    {"name": "캐리어"},
    {"name": "가방 소품"},
    {"name": "지갑/머니클립"},
    {"name": "클러치 백"},
    {"name": "전체"},
    {"name": "크로스백"},
    {"name": "토트백"},
    {"name": "숄더백"},
    {"name": "클러치 백"},
    {"name": "파우치 백"},
    {"name": "백팩"},
    {"name": "웨이스트 백"},
    {"name": "지갑/머니클립"},
    {"name": "가방 소품"},
    {"name": "전체"},
    {"name": "캔버스/단화"},
    {"name": "러닝화/피트니스화"},
    {"name": "농구화"},
    {"name": "기타 스니커즈"},
    {"name": "전체"},
    {"name": "구두"},
    {"name": "로퍼"},
    {"name": "힐/펌프스"},
    {"name": "플랫 슈즈"},
    {"name": "블로퍼"},
    {"name": "샌들"},
    {"name": "슬리퍼"},
    {"name": "기타 신발"},
    {"name": "모카신/보트 슈즈"},
    {"name": "부츠"},
    {"name": "신발 용품"},
    {"name": "전체"},
    {"name": "캡/야구 모자"},
    {"name": "헌팅캡/베레모"},
    {"name": "페도라"},
    {"name": "버킷/사파리햇"},
    {"name": "비니"},
    {"name": "트루퍼"},
    {"name": "기타 모자"},
    {"name": "전체"},
    {"name": "양말"},
    {"name": "스타킹"},
    {"name": "전체"},
    {"name": "여성 속옷 상의"},
    {"name": "여성 속옷 하의"},
    {"name": "여성 속옷 세트"},
    {"name": "남성 속옷"},
    {"name": "홈웨어"},
    {"name": "전체"},
    {"name": "안경"},
    {"name": "선글라스"},
    {"name": "안경 소품"},
    {"name": "전체"},
    {"name": "디지털"},
    {"name": "쿼츠 아날로그"},
    {"name": "오토매틱 아날로그"},
    {"name": "시계 용품"},
    {"name": "기타 시계"},
    {"name": "전체"},
    {"name": "기능성 상의"},
    {"name": "기능성 하의"},
    {"name": "수영복/래쉬가드"},
    {"name": "수영용품"},
    {"name": "캠핑 용품"},
    {"name": "스케이트 용품"},
    {"name": "자전거 용품"},
    {"name": "스노우 웨어"},
    {"name": "스노우 용품"},
    {"name": "기타 스포츠"},
    {"name": "전체"},
    {"name": "골프 잡화"},
    {"name": "골프 모자"},
    {"name": "골프화"},
    {"name": "골프 가방"},
    {"name": "골프 클럽"},
    {"name": "골프공"},
    {"name": "클럽 커버"},
    {"name": "볼마커"},
    {"name": "골프티"},
    {"name": "기타 골프용품"},
    {"name": "전체"},
    {"name": "이어폰"},
    {"name": "헤드폰"},
    {"name": "스피커"},
    {"name": "케이스/슬리브"},
    {"name": "충전기/케이블"},
    {"name": "거치대"},
    {"name": "카메라/카메라용품"},
    {"name": "기타 디지털/테크"},
    {"name": "전체"},
    {"name": "마스크"},
    {"name": "키링/키케이스"},
    {"name": "벨트"},
    {"name": "넥타이"},
    {"name": "머플러"},
    {"name": "스카프/반다나"},
    {"name": "장갑"},
    {"name": "기타 액세서리"},
    {"name": "전체"},
    {"name": "팔찌"},
    {"name": "반지"},
    {"name": "목걸이/펜던트"},
    {"name": "귀걸이"},
    {"name": "발찌"},
    {"name": "브로치/배지"},
    {"name": "헤어 액세서리"},
    {"name": "전체"},
    {"name": "스킨케어"},
    {"name": "베이스 메이크업"},
    {"name": "포인트 메이크업"},
    {"name": "헤어케어"},
    {"name": "바디케어"},
    {"name": "쉐이빙/제모"},
    {"name": "클렌징"},
    {"name": "뷰티 디바이스"},
    {"name": "향수/탈취"},
    {"name": "다이어트/헬스"},
    {"name": "미용 소품"},
    {"name": "덴탈케어"},
    {"name": "전체"},
    {"name": "우산"},
    {"name": "가구/조명"},
    {"name": "침구/쿠션/담요"},
    {"name": "러그/매트/수건"},
    {"name": "디퓨저/캔들"},
    {"name": "액자/포스터"},
    {"name": "키친"},
    {"name": "텀블러"},
    {"name": "문구"},
    {"name": "토이"},
    {"name": "기타 라이프"},
    {"name": "전체"},
    {"name": "잡지/무크지"},
    {"name": "기타 컬처"},
    {"name": "전체"},
    {"name": "반려동물 의류"},
    {"name": "반려동물용품"},
]


class ImageFactoryMixin:
    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        obj = model_class(*args, **kwargs)
        get_remote_image(obj)
        obj.save()
        return obj


class UserFactory(DjangoModelFactory):
    username = Faker("user_name")
    email = Sequence(lambda n: "test{}@test.com".format(n))
    password = LazyAttribute(lambda _: make_password("123123"))

    class Meta:
        model = get_user_model()
        django_get_or_create = ["email"]


class IntroFactory(ImageFactoryMixin, DjangoModelFactory):
    description = Faker("text")
    status = Status.ACTIVE

    class Meta:
        model = Intro


class BannerFactory(ImageFactoryMixin, DjangoModelFactory):
    target_object = LazyAttribute(
        lambda o: random.choice([Notice, Category]).objects.order_by("?").first()
    )
    status = Status.ACTIVE
    target_id = SelfAttribute("target_object.id")
    target_type = LazyAttribute(
        lambda o: ContentType.objects.get_for_model(o.target_object)
    )

    class Meta:
        exclude = ["target_object"]
        model = Banner


class SloganFactory(DjangoModelFactory):
    title = Faker("sentence")
    status = Status.ACTIVE
    location = fuzzy.FuzzyChoice(choices=Location.values)

    class Meta:
        model = Slogan


class FaqFactory(DjangoModelFactory):
    title = Faker("sentence")
    body = Faker("text")

    class Meta:
        model = Faq


class NoticeFactory(DjangoModelFactory):
    title = Faker("sentence")
    body = Faker("text")

    class Meta:
        model = Notice


class PageFactory(DjangoModelFactory):
    slug = Faker("slug")
    title = Faker("sentence")
    body = Faker("text")

    class Meta:
        model = Page
        django_get_or_create = ("slug",)


class BrandFactory(ImageFactoryMixin, DjangoModelFactory):
    name = Faker("company")
    description = Faker("text")

    class Meta:
        model = Brand


class ContentFactory(ImageFactoryMixin, DjangoModelFactory):
    title = Faker("sentence")
    play_time = random.choice(PLAYTIME)
    file_fps = random.choice(FILEFPS)
    file_frame = random.choice(FILEFRAME)
    file_size = random.choice(FILESIZE)
    user = User.objects.first()

    class Meta:
        model = Content



class SubCategoryFactory(ImageFactoryMixin, DjangoModelFactory):
    status = Status.ACTIVE
    name = LazyAttribute(lambda _: random.choice(SUB_CATEGORY).get("name"))
    description = Faker("text")

    class Meta:
        model = SubCategory


class CategoryFactory(DjangoModelFactory):
    status = Status.ACTIVE
    name = Sequence(lambda n: CATEGORY[n].get("name_en"))
    sub_name = Sequence(lambda n: CATEGORY[n].get("name"))
    description = Faker("text")

    sub_factories = RelatedFactoryList(
        SubCategoryFactory, factory_related_name="category", size=lambda: randint(3, 6)
    )

    class Meta:
        model = Category


class ImageFactory(ImageFactoryMixin, DjangoModelFactory):
    class Meta:
        model = Image


class ItemFactory(DjangoModelFactory):
    name = Faker("sentence")
    description = Faker("text")
    price = fuzzy.FuzzyInteger(10_000, 500_000, step=500)
    shipping_fee = 2500
    brand = LazyAttribute(lambda _: Brand.objects.order_by("?").first())
    category = LazyAttribute(lambda _: Category.objects.order_by("?").first())
    sub_category = LazyAttribute(
        lambda o: o.category.sub_categories.order_by("?").first()
    )

    images = RelatedFactoryList(
        ImageFactory, factory_related_name="target", size=lambda: randint(3, 6)
    )

    class Meta:
        model = Item
