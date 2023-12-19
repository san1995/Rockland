import time
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

from django.shortcuts import render, redirect
from django.http import HttpResponse 

#webpage navigation functions here 
def ok(request): 
    return render(request, 'index.html')

def createuser(request): 
    return render(request, 'createuser.html')

def home(request): 
    return render(request, 'home.html')

''' def testlogin(request):
    print("post method called testlogin")
    if request.method == "POST":
        title = request.POST.get('username')
        print(title)
        pw = request.POST.get('password')
        print(pw)
      
        return HttpResponse(status.HTTP_200_OK)'''

    
# create endpoints here
# endpoints = certain url we can access the data from

# Login 
@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return render(request, 'index.html', {'status':'wrong username or password entered!'})
        #return Response({"detail":"Not Found."}, status=status.HTTP_404_NOT_FOUND)
        
    # found user
    token, created  = Token.objects.get_or_create(user=user)
    authUserSerializer = AuthUserSerializer(instance=user)
    #return Response({"token": token.key, "user": authUserSerializer.data})
    return render(request, 'home.html')

@api_view(['POST'])
def signup(request):
    #form validation
    uname = False
    pw = False
    retypepw = False
    mail = False 
    ispasswordsame = False
   
    if request.data['username'] != "":
        uname = True
    if request.data['password'] != "":
        pw = True
    if request.data['repassword'] != "":
        retypepw = True
    if request.data['email'] != "":
        mail = True
    if request.data['password'] == request.data['repassword']:
        ispasswordsame = True
    
    if uname == True and pw == True and retypepw == True and mail == True and ispasswordsame == True:
    #if all fields are populated and retype password is correct
        authUserSerializer = AuthUserSerializer(data=request.data)
        if authUserSerializer.is_valid():
            authUserSerializer.save()
            
            # After user is saved into db, retireve user's username
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()

            # Create token for the account
            token = Token.objects.create(user=user)

            #return Response({"token": token.key, "user": authUserSerializer.data})
            msg_list = {}
            msg_list['accountcreationstatus'] = "Account succesfully created!"
            
            return render(request, 'createuser.html', msg_list)
          
            #render(request, 'home.html')

        # If not valid 
        #return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else: #else block
            #print(type(authUserSerializer.errors))
            error_msgs = authUserSerializer.errors
            if "username" in error_msgs: #if username already exists
                error_list = {}
                error_list['unameerr'] = error_msgs["username"] 
                return render(request, 'createuser.html', error_list)
            else:
                pass #do nothing 
    else: 
        error_list = {}
        if uname == False:
            error_list['unameerr'] = "username field is empty!"
        if pw == False: 
            error_list['pwempty'] = "password field is empty!"
        if retypepw == False:
            error_list['repwerr'] = "re-type password field is empty!"
        if mail == False:
            error_list['emailerr'] = "email field is empty!"
        if ispasswordsame == False:
            error_list['retypeerr'] = "retyped password is different!"
            
        return render(request, 'createuser.html', error_list)
        

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
    

