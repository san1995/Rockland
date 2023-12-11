from django.http import JsonResponse
from .models import Accounts
from .serializers import AccountSerializer

# create endpoints here
# endpoints = certain url we can access the data from

def account_list(request):

    # get all account
    # serialize them
    # return json

    accounts = Accounts.objects.all()

    accSerializer = AccountSerializer(accounts, many=True)

    return JsonResponse({'accounts': accSerializer.data}, safe=False)