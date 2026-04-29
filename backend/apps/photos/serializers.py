from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    """写真投稿情報のデータ整形を行うシリアライザ"""

    # 画像のURLを作成し、`image_url`フィールドで返す.
    # 保存先の絶対URLを返すだけなら`image`フィールドが自動で同じ結果を返すためこの処理は不要.
    # 画像が存在しない場合にデフォルト画像のURLを返したり、
    # S3など外部ストレージの署名付きURLを生成する場合に使用する.
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        model = Photo
        fields = ["id", "title", "comment", "image_url", "posted_at"]
        read_only_fields = ["id", "image_url", "posted_at"]
