from django.db import models


class Photo(models.Model):
    """写真投稿情報を管理するモデル"""

    # 主キーを明示しない場合`id`という名前の`AutoField`を自動追加するため
    # `id`の定義は不要. 型は`settings.py`の以下で指定している
    #   DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

    # 作成したら以下コマンドでデータベースにテーブル作成する
    # python manage.py makemigrations photos
    # python manage.py migrate

    # 写真タイトル
    title = models.CharField(max_length=255)

    # コメント
    comment = models.TextField(blank=True)

    # 画像ファイル
    image = models.ImageField(upload_to="photos/%Y/%m/")

    # 投稿日時
    posted_at = models.DateTimeField(auto_now_add=True)
