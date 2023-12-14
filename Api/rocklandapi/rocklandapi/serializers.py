from rest_framework import serializers
from .models import Accounts

class AccountSerializer(serializers.ModelSerializer):
    class Meta: # metadata describing the model
        model = Accounts
        fields = ['username', 'password', 'usertype', 'status']