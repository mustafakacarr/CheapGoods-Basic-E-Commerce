from django.contrib import admin
from django.urls import path
from base.views import order_views as views

urlpatterns = [
#    path('test/', views.getRoutes,name="routes"),
   path('add/',view=views.addOrderItems, name="add-order"),
   path('myorders/',view=views.getMyOrders, name="get-my-orders"),
   path('<str:pk>',view=views.getOrderById, name="get-single-order"),
   path('',view=views.getOrders, name="get-orders"),
 
]
