from typing import Any, Dict
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product
from base.serializer import ProductSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
      def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["username"] = self.user.username
        data["email"] = self.user.email


        return data

    

@api_view(['GET'])
def getRoutes(request):
    routes=[
        "api/products",
        "api/products/create",
        "api/products/<id>",
    ]
    return Response(routes);

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializers=ProductSerializer(products, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializers=ProductSerializer(product, many=False)
    return Response(serializers.data)
