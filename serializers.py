from rest_framework import serializers
from .models import *


class Doner_serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Doners
        fields = "__all__"