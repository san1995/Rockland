from django.http import JsonResponse
from .models import Accounts
from .serializers import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

# create endpoints here
# endpoints = certain url we can access the data from

# Login 
@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":"Not Found."}, status=status.HTTP_404_NOT_FOUND)
    # found user
    token, created  = Token.objects.get_or_create(user=user)
    authUserSerializer = AuthUserSerializer(instance=user)
    return Response({"token": token.key, "user": authUserSerializer.data})

@api_view(['POST'])
def signup(request):
    authUserSerializer = AuthUserSerializer(data=request.data)
    if authUserSerializer.is_valid():
        authUserSerializer.save()

        # After user is saved into db, retireve user's username
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()

        # Create token for the account
        token = Token.objects.create(user=user)

        return Response({"token": token.key, "user": authUserSerializer.data})

    # If not valid 
    return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Sample api that check the token from request

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}.".format(request.user.email) )

# CRUD Accounts ( TO BE REMOVED )

@api_view(['GET', 'POST'])
def account_list(request):

    #Get all Accounts
    if request.method == 'GET':
        # get all account
        accounts = Accounts.objects.all()
        # serialize them
        accSerializer = AccountSerializer(accounts, many=True)
        # return json
        return Response(accSerializer.data)
    
    # Create an Account
    elif request.method == 'POST':
        # take the data send over
        # deserialize it
        # create a object out of it
        accSerializer = AccountSerializer(data = request.data)  # data=request.data - data from the json that is send over
        if accSerializer.is_valid():
            accSerializer.save()
            return Response(accSerializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET', 'PUT', 'DELETE'])
def account_detail(request, username):

    try:
        account = Accounts.objects.get(pk=username)
    # if account does not exist
    except Accounts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Search by username
    if request.method == 'GET':
        accSerializer = AccountSerializer(account)
        return Response(accSerializer.data)

    # Edit account based on username
    elif request.method == 'PUT':
        accSerializer = AccountSerializer(account, data=request.data) 
        if accSerializer.is_valid():
            accSerializer.save()
            return Response(accSerializer.data)
        return Response(accSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete account
    elif request.method == 'DELETE':
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)