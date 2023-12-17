from rest_framework import serializers
from django.contrib.auth.models import User
from .models import RockInformation

# class AccountSerializer(serializers.ModelSerializer):
#     class Meta: # metadata describing the model
#         model = Accounts
#         fields = ['username', 'password', 'usertype', 'status']

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id','username', 'password', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

class RockInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RockInformation
        fields = ['rock_name', 'type', 'colour', 'hardness', 'description']
