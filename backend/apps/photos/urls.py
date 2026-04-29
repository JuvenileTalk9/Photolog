from django.urls import path
from .views import PhotoListCreateView, PhotoDetailView


urlpatterns = [
    path("", PhotoListCreateView.as_view()),
    path("<int:pk>/", PhotoDetailView.as_view()),
]
