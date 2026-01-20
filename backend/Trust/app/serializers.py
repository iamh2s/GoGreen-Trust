from rest_framework import serializers
from .models import Doners, DonorAction

class DonerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doners
        fields = "__all__"

class DonorActionSerializer(serializers.ModelSerializer):
    donor_name = serializers.CharField(source="donor.name", read_only=True)
    donor_email = serializers.CharField(source="donor.email", read_only=True)

    class Meta:
        model = DonorAction
        fields = ["id", "donor", "donor_name", "donor_email", "action_type", "timestamp"]
