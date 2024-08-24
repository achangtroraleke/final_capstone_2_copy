from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
  path('', views.getRoutes, name='routes'),
  path('register/', views.register_user, name='register'),
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('favorites/add/', views.add_to_favorites, name='favorite'),
  path('favorites/delete/',views.remove_favorites, name='remove')
]