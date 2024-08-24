from rest_framework.serializers import ModelSerializer
from .models import MyCustomUser
from django.contrib.auth.hashers import make_password

class MyUserSerializer(ModelSerializer):
    class Meta:
        model = MyCustomUser
        fields = ('email', 'password', 'username')

        def create(self, validated_data):
            self.validated_data['password'] = make_password(validated_data['password'])     
            user = MyCustomUser.objects.create_user(validated_data['email'], None, validated_data['password'],validated_data['username'])
            return user