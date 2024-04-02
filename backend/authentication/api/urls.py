from django.urls import path
from . import views
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register',RegisterView.as_view(),name='register'),
    path('login',LoginView.as_view(),name='login'),
]