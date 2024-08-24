from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from .serializers import MyUserSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['favorites'] = user.favorite_recipes
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
        

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoutes(request):
    user = request.user
    print(user)
    routes =[
        {
            'route':'route'
        }
    ]

    return Response(routes)

@api_view(['POST'])
def register_user(request):
    # {"email": "test@test.com", "password": "Incerto1995.", "username": "tester"}
    data = request.data
    serializer = MyUserSerializer(data=data)
    print(data)
    if serializer.is_valid(raise_exception=True):
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
     
        serializer.create(serializer.validated_data)
    
    return Response()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_favorites(request):
    data = request.data
    user = request.user
    favorite_recipes_list = user.favorite_recipes['recipes']
    print(data["recipe_id"])
    if data['recipe_id'] in favorite_recipes_list:
        return Response("You've already saved this recipe.")
    else:
        favorite_recipes_list.append(data["recipe_id"])
        print(favorite_recipes_list)
        user.save()
        return Response({"favorite_ids":favorite_recipes_list})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_favorites(request):
    data = request.data
    user = request.user
    favorite_recipes_list = user.favorite_recipes['recipes']
    print(data["recipe_id"])
    if data['recipe_id'] in favorite_recipes_list:
        favorite_recipes_list.remove(data["recipe_id"])
        print(favorite_recipes_list)
        user.save()
        return Response()