from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.views import APIView
from authentication.api.serializers import UserRegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import permissions
from rest_framework.authentication import authenticate
# from django.contrib.auth import authenticate
from authentication.models import SocialMediaUser
#from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import api_view, permission_classes
import requests
#from authentication import helper
from .serializers import *
from django.db.models import Count,Q
from django.db.models.functions import ExtractMonth, ExtractYear
from django.utils import timezone
#from posts.serializer import *


# user regiatration  view
class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser]

    def post(self, request):
        data = request.data
        print(data)

        #fetched data sending to serializer
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid():

            # if valid user is created using serializer
            user = serializer.save()
            print(serializer.data,"serializer data")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
 
    
 #Login view   
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        print(data)
       
        # fetched data sending to serializer
        serializer = UserLoginSerializer(data=data)
        print(serializer)
        
        if serializer.is_valid(raise_exception=True):
            # If valid data fetched
            email_or_username = serializer.validated_data['email_or_username']
            password = serializer.validated_data['password']
            
            try:
                # authenticate with email or username
                user = authenticate(request, username=email_or_username, password=password)
                print(user)
                
                # if user instance is returned and create token and considered as user logged in
                if user:
                    if user.is_deleted:
                        return Response({"details": "This account has been deleted."}, status=401)

                    print("success login")
                    refresh = RefreshToken.for_user(user)
                    refresh['email'] = user.email
                    refresh['is_superuser'] = user.is_superuser
                    access_token = str(refresh.access_token)
                    refresh_token = str(refresh)

                    return Response(
                        {
                            "email_or_username": email_or_username,
                            "password": password,
                            "access": access_token,
                            "refresh": refresh_token,
                        },
                        status=201,
                    )
                else:
                    # If user is None, wrong email or password
                    return Response({"details": "Invalid email or password"}, status=401)

            except SocialMediaUser.DoesNotExist:
                # If user doesn't exist, wrong email or password
                return Response({"details": "no user email or password"}, status=401)
