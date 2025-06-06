
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework import viewsets
# Create your views here.
import json
import hashlib
import requests
from rest_framework.response import Response
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
import datetime as time


@api_view(["POST"])
def initiate_upi_payment(request):
    data = request.data
    amount = data.get("amount")  # Amount in paise (e.g., ₹1 = 100 paise)
    transaction_id = f"TXN{int(time.time())}"  # Unique Transaction ID
    
    payload = {
        "merchantId": settings.PHONEPE_MERCHANT_ID,
        "merchantTransactionId": transaction_id,
        "amount": amount,
        "callbackUrl": "https://yourdomain.com/api/payment-status/",
        "paymentInstrument": {"type": "UPI_INTENT"},
    }

    # Convert to JSON and Encode
    payload_json = json.dumps(payload)
    checksum_str = payload_json + settings.PHONEPE_SALT_KEY
    checksum = hashlib.sha256(checksum_str.encode()).hexdigest() + "###" + settings.PHONEPE_SALT_INDEX

    headers = {
        "Content-Type": "application/json",
        "X-VERIFY": checksum
    }

    response = requests.post(f"{settings.PHONEPE_BASE_URL}/pg/v1/pay", json=payload, headers=headers)
    return JsonResponse(response.json())



@api_view(["POST"])
def payment_status(request):
    data = request.data
    transaction_id = data.get("transactionId")

    payload = {"merchantId": settings.PHONEPE_MERCHANT_ID, "merchantTransactionId": transaction_id}
    checksum_str = json.dumps(payload) + settings.PHONEPE_SALT_KEY
    checksum = hashlib.sha256(checksum_str.encode()).hexdigest() + "###" + settings.PHONEPE_SALT_INDEX

    headers = {"Content-Type": "application/json", "X-VERIFY": checksum}
    response = requests.post(f"{settings.PHONEPE_BASE_URL}/pg/v1/status", json=payload, headers=headers)

    return JsonResponse(response.json())



@api_view(["POST"])
def initiate_payment(request):
    data = request.data
    amount = data.get("amount")  # Amount in paise (e.g., ₹1 = 100 paise)
    transaction_id = f"TXN{int(time.time())}"  # Unique Transaction ID
    
    payload = {
        "merchantId": settings.PHONEPE_MERCHANT_ID,
        "merchantTransactionId": transaction_id,
        "amount": amount,
        "callbackUrl": "https://yourdomain.com/api/payment-status/",
        "paymentInstrument": {"type": "UPI_INTENT"},
    }

    # Convert to JSON and Encode
    payload_json = json.dumps(payload)
    checksum_str = payload_json + settings.PHONEPE_SALT_KEY
    checksum = hashlib.sha256(checksum_str.encode()).hexdigest() + "###" + settings.PHONEPE_SALT_INDEX

    headers = {
        "Content-Type": "application/json",
        "X-VERIFY": checksum
    }

    response = requests.post(f"{settings.PHONEPE_BASE_URL}/pg/v1/pay", json=payload, headers=headers)
    return JsonResponse(response.json())
 
class Doners_view(viewsets.ModelViewSet):
    queryset = Doners.objects.all()
    serializer_class = Doner_serializer