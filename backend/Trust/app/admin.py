from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Doners)
class DonersAdmin(admin.ModelAdmin): list_display = ("id", "name", "email", "phonenumber", "amount", "country", "state", "city")
@admin.register(DonorAction) 
class DonorActionAdmin(admin.ModelAdmin): list_display = ("id", "donor", "action_type", "timestamp") 
list_filter = ("action_type", "timestamp")
