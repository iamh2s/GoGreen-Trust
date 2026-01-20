"""
URL configuration for Trust project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import (
    Doners_view,
    initiate_payment,
    payment_status,
    log_donor_action,
    donor_actions,
)

# ✅ Register donor ViewSet with DRF router
router = DefaultRouter()
router.register(r'doner', Doners_view, basename="doner")

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # Donor CRUD via ViewSet
    path('detail/', include(router.urls)),

    # PhonePe payment endpoints
    path("api/initiate-upi-payment/", initiate_payment, name="initiate_payment"),
    path("api/verify-payment/", payment_status, name="verify_payment"),

    # ✅ Extra donor action endpoints
    path("donor/action/", log_donor_action, name="donor-action"),                # POST {donor_id, action_type}
    path("donor/<int:donor_id>/actions/", donor_actions, name="donor-actions"), # GET donor’s past actions
]
