from rest_framework import serializers
from authentication.models import SocialMediaUser
from django.contrib.auth.hashers import make_password
import os
from django.core import exceptions
from datetime import datetime


# user register serializer
class UserRegisterSerializer(serializers.ModelSerializer): 
    print("serializer for registering user")
    

    profile_pic = serializers.ImageField(required=False)  # Update the field definition

    class Meta:
        model = SocialMediaUser
        fields = ('username', 'email', 'password', 'name', 'phone','profile_pic')

    # create user
    def create(self, data):
        print("Create method in UserRegisterSerializer is called")

        profile_pic = data.pop('profile_pic', None)
        user = SocialMediaUser.objects.create_user(**data,profile_pic=profile_pic)
        
        print(user)
        return user
    
    
#User LoginSerializer
class UserLoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)
    
   
    def validate(self, data):
        email_or_username = data.get('email_or_username')
        password = data.get('password')
        print(data,"serializer data")
    
        return data
    
