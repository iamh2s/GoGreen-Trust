from django.db import models



class Doners(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=60)
    phonenumber = models.IntegerField()
    amount=models.IntegerField(null=True)
    country = models.CharField(max_length=40)
    state = models.CharField(max_length=40)
    city = models.CharField(max_length=25)
    pincode = models.IntegerField(null = True)
    gender = models.CharField(max_length=10)