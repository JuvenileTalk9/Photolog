import io
import os

from PIL import Image
from django.core.files.base import ContentFile
from django.conf import settings
from rest_framework import serializers

from .models import Photo


class PhotoCreateSerializer(serializers.ModelSerializer):
    """写真投稿の新規作成用シリアライザ"""

    class Meta:
        model = Photo
        fields = ["id", "title", "comment", "image", "thumbnail", "location", "posted_at"]
        read_only_fields = ["id", "thumbnail", "posted_at"]

    def create(self, validated_data):
        image_file = validated_data["image"]
        thumbnail = self._generate_thumbnail(image_file, settings.PHOTOS_THUMBNAIL_SIZE)
        validated_data["thumbnail"] = thumbnail
        return super().create(validated_data)

    def _generate_thumbnail(self, image_file, size) -> ContentFile:
        """画像からサムネイルを作成し、ContentFileとして返す"""
        img = Image.open(image_file)

        if img.mode != "RGB":
            img = img.convert("RGB")

        # 中心正方形を切り出す
        width, height = img.size
        min_dim = min(width, height)
        left = (width - min_dim) // 2
        top = (height - min_dim) // 2
        img = img.crop((left, top, left + min_dim, top + min_dim))

        # リサイズ
        img = img.resize((size, size), Image.LANCZOS)

        # バイト列に書き出す
        buffer = io.BytesIO()
        img.save(buffer, format="JPEG", quality=85)
        buffer.seek(0)

        original_name = os.path.splitext(image_file.name)[0]
        return ContentFile(buffer.read(), name=f"{original_name}_thumb.jpg")


class PhotoListSerializer(serializers.ModelSerializer):
    """写真投稿の一覧取得用シリアライザ"""

    class Meta:
        model = Photo
        fields = ["id", "title", "thumbnail", "posted_at"]
        read_only_fields = ["id", "title", "thumbnail", "posted_at"]


class PhotoDetailSerializer(serializers.ModelSerializer):
    """写真投稿詳細の取得/修正用シリアライザ"""

    class Meta:
        model = Photo
        fields = ["id", "title", "comment", "image", "location", "posted_at"]
        read_only_fields = ["id", "image", "posted_at"]
