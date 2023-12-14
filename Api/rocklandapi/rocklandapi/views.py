from django.http import JsonResponse
from .models import Accounts
from .serializers import AccountSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# create endpoints here
# endpoints = certain url we can access the data from

@api_view(['GET', 'POST'])
def account_list(request):

    if request.method == 'GET':
        # get all account
        accounts = Accounts.objects.all()
        # serialize them
        accSerializer = AccountSerializer(accounts, many=True)
        # return json
        return Response(accSerializer.data)
    
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
    except Accounts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        accSerializer = AccountSerializer(account)
        return Response(accSerializer.data)

    elif request.method == 'PUT':
        accSerializer = AccountSerializer(account, data=request.data) 
        if accSerializer.is_valid():
            accSerializer.save()
            return Response(accSerializer.data)
        return Response(accSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)