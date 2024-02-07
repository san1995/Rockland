from django.http import JsonResponse
from .models import RockInformation
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
    print("login called")
    print(request.data)
    print(type(request.data))
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":"Not Found."}, status=status.HTTP_404_NOT_FOUND)
    # found user
    token, created  = Token.objects.get_or_create(user=user)
    authUserSerializer = AuthUserSerializer(instance=user)
    return Response({"token": token.key, "user": authUserSerializer.data})

# Sign Up
@api_view(['POST'])
def signup(request):
    print("signup called")
    print(request.data)
    authUserSerializer = AuthUserSerializer(data=request.data)
    if authUserSerializer.is_valid():
        authUserSerializer.save()
        # After user is saved into db, retireve user's username
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        #new code here
        # ref fields = ['id','username', 'password', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']
        #check passed data 
        user.save()

        # Create token for the account
        token = Token.objects.create(user=user)

        return Response({"token": token.key, "user": authUserSerializer.data})

    # If not valid 
    return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all users and Add An User Account
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def usersAcc_list(request):
    
    # Retrieve User Accounts
    if request.method == 'GET':
        # get all users
        users = User.objects.filter(is_staff=False)

        # serialize
        authUserSerializer = AuthUserSerializer(users, many=True)
        return Response(authUserSerializer.data)
    
    # Add An User Account
    elif request.method == 'POST':
        authUserSerializer = AuthUserSerializer(data=request.data)
        if authUserSerializer.is_valid():
            authUserSerializer.save()

            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()

            return Response({"Created": True}, status=status.HTTP_201_CREATED)
        
        return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# Retrieve User Account Details, Edit User Account Details
@api_view(['GET', 'PUT'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def userAcc_details(request, username):
    # Get the user by username
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    # Get User Account details by username
    if request.method == 'GET':
        authUserSerializer = AuthUserSerializer(user)
        return Response(authUserSerializer.data)
        
    # Edit User Account details by username
    elif request.method == 'PUT':
        authUserSerializer = AuthUserSerializer(user, data=request.data)
        if authUserSerializer.is_valid():
            authUserSerializer.save()
            return Response({"Updated":True})
        return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Rock Information
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def rockInfo_list(request):
    
    # Retrieve all Rock Information
    if request.method == 'GET':
        rocks = RockInformation.objects.all()
        rockInfoSerializer = RockInfoSerializer(rocks, many=True)
        return Response(rockInfoSerializer.data)
    
    # Add an Rock Info
    elif request.method == 'POST':
        rockInfoSerializer = RockInfoSerializer(data=request.data)
        if rockInfoSerializer.is_valid():
            rockInfoSerializer.save()
            return Response({"Created": True}, status=status.HTTP_201_CREATED)
        return Response(rockInfoSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# Rock Information Details
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def rockInfo_detail(request, rockname):

    # Get rock by rock_name
    try:
        rock = RockInformation.objects.get(pk=rockname)
    except RockInformation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Get details by rock_name
    if request.method == 'GET':
        rockInfoSerializer = RockInfoSerializer(rock)
        return Response(rockInfoSerializer.data)
    
    # Edit details by rock_name
    elif request.method == 'PUT':
        rockInfoSerializer = RockInfoSerializer(rock, data=request.data)
        if rockInfoSerializer.is_valid():
            rockInfoSerializer.save()
            return Response({"Updated":True})
        return Response(rockInfoSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        rock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    

# Sample api that check the token from request

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}.".format(request.user.username) )






# # CRUD Accounts ( TO BE REMOVED )

# @api_view(['GET', 'POST'])
# def account_list(request):

#     #Get all Accounts
#     if request.method == 'GET':
#         # get all account
#         accounts = Accounts.objects.all()
#         # serialize them
#         accSerializer = AccountSerializer(accounts, many=True)
#         # return json
#         return Response(accSerializer.data)
    
#     # Create an Account
#     elif request.method == 'POST':
#         # take the data send over
#         # deserialize it
#         # create a object out of it
#         accSerializer = AccountSerializer(data = request.data)  # data=request.data - data from the json that is send over
#         if accSerializer.is_valid():
#             accSerializer.save()
#             return Response("Created", status=status.HTTP_201_CREATED)
        
# @api_view(['GET', 'PUT', 'DELETE'])
# def account_detail(request, username):

#     try:
#         account = Accounts.objects.get(pk=username)
#     # if account does not exist
#     except Accounts.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     # Search by username
#     if request.method == 'GET':
#         accSerializer = AccountSerializer(account)
#         return Response(accSerializer.data)

#     # Edit account based on username
#     elif request.method == 'PUT':
#         accSerializer = AccountSerializer(account, data=request.data) 
#         if accSerializer.is_valid():
#             accSerializer.save()
#             return Response(accSerializer.data)
#         return Response(accSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Delete account
#     elif request.method == 'DELETE':
#         account.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    