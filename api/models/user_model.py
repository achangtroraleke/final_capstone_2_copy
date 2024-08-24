from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class MyCustomUser(AbstractUser):

    def recipe_default():
        return {"recipes":[]}

    name = models.CharField(max_length=200, null=True, )    
    email = models.EmailField(max_length=100, unique=True)
    favorite_recipes = models.JSONField("Recipes", default=recipe_default)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']