from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Accounts

class AccountSerializer(serializers.ModelSerializer):
    class Meta: # metadata describing the model
        model = Accounts
        fields = ['username', 'password', 'usertype', 'status']

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id','username', 'password', 'email']
