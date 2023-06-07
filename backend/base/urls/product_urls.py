from django.contrib import admin
from django.urls import path
from base.views import product_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('test/', views.getRoutes,name="routes"),
    path('', views.getProducts,name="products"),
    path('<str:pk>', views.getProduct,name="single-product"),
 
]
