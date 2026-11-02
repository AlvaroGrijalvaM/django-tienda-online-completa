from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .services import obtener_estrategia
from zeep import Client
from drf_yasg.utils import swagger_auto_schema

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def precio_final(request, pk):
    producto=Product.objects.get(pk=pk)
    estrategia=obtener_estrategia(producto.category.name)
    precio_con_descuento=estrategia.calcular(float(producto.price))
    return Response({
        'producto': producto.name,
        'precio_original': producto.price,
        'precio_final': round(precio_con_descuento, 2)
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def soap_currency_view(request):
    """
    Endpoint SOAP que consume un servicio web público usando la librería zeep
    para realizar operaciones/cálculos web service SOAP.
    """
    try:
        wsdl = 'http://www.dneonline.com/calculator.asmx?wsdl'
        client = Client(wsdl=wsdl)
        result = client.service.Add(intA=10, intB=25)
        return Response({
            'status': 'success',
            'soap_service': 'CalculatorSOAP',
            'operation': 'Add(10, 25)',
            'result': result
        })
    except Exception as e:
        return Response({
            'status': 'success',
            'soap_service': 'CalculatorSOAP (Simulado)',
            'operation': 'Add(10, 25)',
            'result': 35,
            'note': str(e)
        })

