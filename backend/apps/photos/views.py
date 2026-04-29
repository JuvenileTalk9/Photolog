from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Photo
from .serializers import PhotoSerializer

# よく使うGeneric APIView 一覧
#   クラス                        HTTPメソッド                 用途
#   ==============================================================================
#   ListAPIView                   GET                         一覧取得
#   RetrieveAPIView               GET                         1件取得
#   CreateAPIView                 POST                        作成
#   UpdateAPIView	              PUT / PATCH                 更新
#   DestroyAPIView                DELETE                      削除
#   ListCreateAPIView             GET / POST                  一覧取得 + 作成
#   RetrieveUpdateDestroyAPIView  GET / PUT / PATCH / DELETE  1件取得 + 更新 + 削除
#
# エンドポイントは通常「一覧・作成」と「詳細・更新・削除」の2本に集約するため、
# ListCreateAPIView / RetrieveUpdateDestroyAPIView を使うことが多い


class PhotoListCreateView(ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class PhotoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
