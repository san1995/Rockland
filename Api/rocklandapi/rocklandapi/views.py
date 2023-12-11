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
        return JsonResponse({'accounts': accSerializer.data})
    
    if request.method == 'POST':
        # take the data send over
        # deserialize it
        # create a object out of it
        accSerializer = AccountSerializer(data = request.data)
        if accSerializer.is_valid():
            accSerializer.save()
            return Response(accSerializer.data, status=status.HTTP_201_CREATED)