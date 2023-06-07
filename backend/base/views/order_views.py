from typing import Any, Dict
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.products import products
from base.models import Order,ShippingDetail,Product,OrderItem
from base.serializer import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import permission_classes
from rest_framework import status
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user=request.user
    data=request.data
    orderItems=data['orderItems']
    if orderItems and len(orderItems)==0:
        return Response({'detail': ' There is no item being ordered'},status=status.HTTP_400_BAD_REQUEST)
    else:
        
    # 1-) Add order
        shipping=ShippingDetail.objects.create(
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
          
        order=Order.objects.create(
            shippingDetail=shipping,
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        # 2-) Add shipping detail
  
    # 3-) order and order items set
        for i in orderItems:
                product = Product.objects.get(_id=i['product'])

                item = OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        quantity=i['quantity'],
                        price=i['price'],
                        image=product.image.url,
                    )
    # 4-) update stock

        product.countInStock -= item.quantity
        product.save()
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    orders=Order.objects.all()
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user=request.user
    try:
         order=Order.objects.get(id=pk)
         if user.is_staff or order.user==user:
              serializer=OrderSerializer(order,many=False)
              return Response(serializer.data)
         else:
              return Response({'detail':'Not authorized order'},status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
            print(f"get metodu error: {e}")
            
            return Response({'detail':'Order doesnt exist'},status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
