from dataclasses import field
from rest_framework import serializers
from django.contrib.auth.models import User 
from .models import Product,ShippingDetail,Order,OrderItem
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields ='__all__'

class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
  
    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin']

    def get__id(self,obj):
        return obj.id
    def get_isAdmin(self,obj):
        return obj.is_staff
    def get_name(self,obj):
        name=obj.first_name
        if(name==""):
          name=obj.email

        return name
class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin','token']

    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)

class ShippingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingDetail
        fields ='__all__'
class OrderSerializer(serializers.ModelSerializer):
    orderItems=serializers.SerializerMethodField(read_only=True)
    shippingDetail=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Order
        fields ='__all__'
    def get_orderItems(self,obj):
        items=obj.orderitem_set.all()
        serializer=OrderItemSerializer(items,many=True)
        return serializer.data
    
    def get_shippingDetail(self,obj):
        try:
            detail=ShippingDetailSerializer(obj.shippingDetail, many=False).data
        except Exception as e:
            print(f"ShippingDetail serialization error: {e}")
            detail=False

        return detail
    
    def get_user(self,obj):
        user=obj.user
        serializer=UserSerializer(user,many=False)
        return serializer.data

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields ='__all__'
