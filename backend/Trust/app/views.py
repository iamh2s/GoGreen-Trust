from .models import Doners, DonorAction
from .serializers import DonerSerializer, DonorActionSerializer

from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

import json
import hashlib
import requests
import datetime as time


# -------------------------------
# ✅ PhonePe Payment Endpoints
# -------------------------------

@api_view(["POST"])
def initiate_upi_payment(request):
    data = request.data
    amount = data.get("amount")  # Amount in paise (₹1 = 100 paise)
    transaction_id = f"TXN{int(time.time())}"  # Unique Transaction ID

    payload = {
        "merchantId": settings.PHONEPE_MERCHANT_ID,
        "merchantTransactionId": transaction_id,
        "amount": amount,
        "callbackUrl": "https://yourdomain.com/api/payment-status/",
        "paymentInstrument": {"type": "UPI_INTENT"},
    }

    payload_json = json.dumps(payload)
    checksum_str = payload_json + settings.PHONEPE_SALT_KEY
    checksum = hashlib.sha256(checksum_str.encode()).hexdigest() + "###" + settings.PHONEPE_SALT_INDEX

    headers = {"Content-Type": "application/json", "X-VERIFY": checksum}
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
    amount = data.get("amount")
    transaction_id = f"TXN{int(time.time())}"

    payload = {
        "merchantId": settings.PHONEPE_MERCHANT_ID,
        "merchantTransactionId": transaction_id,
        "amount": amount,
        "callbackUrl": "https://yourdomain.com/api/payment-status/",
        "paymentInstrument": {"type": "UPI_INTENT"},
    }

    payload_json = json.dumps(payload)
    checksum_str = payload_json + settings.PHONEPE_SALT_KEY
    checksum = hashlib.sha256(checksum_str.encode()).hexdigest() + "###" + settings.PHONEPE_SALT_INDEX

    headers = {"Content-Type": "application/json", "X-VERIFY": checksum}
    response = requests.post(f"{settings.PHONEPE_BASE_URL}/pg/v1/pay", json=payload, headers=headers)

    return JsonResponse(response.json())


# -------------------------------
# ✅ Donor Views
# -------------------------------

class Doners_view(viewsets.ModelViewSet):
    queryset = Doners.objects.all()
    serializer_class = DonerSerializer

    # Custom action: log donor contact (email/phone/message)
    @action(detail=True, methods=["post"], url_path="log-action")
    def log_action(self, request, pk=None):
        donor = self.get_object()
        action_type = request.data.get("action_type")

        if action_type not in ["email", "phone", "message"]:
            return Response({"detail": "Invalid action_type"}, status=status.HTTP_400_BAD_REQUEST)

        action = DonorAction.objects.create(donor=donor, action_type=action_type)
        serializer = DonorActionSerializer(action)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Custom action: list donor’s past actions
    @action(detail=True, methods=["get"], url_path="actions")
    def actions(self, request, pk=None):
        donor = self.get_object()
        actions = donor.actions.order_by("-timestamp")
        serializer = DonorActionSerializer(actions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------------------
# ✅ Standalone API Endpoints (optional)
# -------------------------------

@api_view(["POST"])
def log_donor_action(request):
    donor_id = request.data.get("donor_id")
    action_type = request.data.get("action_type")

    if not donor_id or not action_type:
        return Response({"detail": "donor_id and action_type are required"}, status=status.HTTP_400_BAD_REQUEST)

    if action_type not in ["email", "phone", "message"]:
        return Response({"detail": "Invalid action_type"}, status=status.HTTP_400_BAD_REQUEST)

    donor = get_object_or_404(Doners, id=donor_id)
    action = DonorAction.objects.create(donor=donor, action_type=action_type)
    serializer = DonorActionSerializer(action)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def donor_actions(request, donor_id):
    donor = get_object_or_404(Doners, id=donor_id)
    actions = donor.actions.order_by("-timestamp")
    serializer = DonorActionSerializer(actions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
