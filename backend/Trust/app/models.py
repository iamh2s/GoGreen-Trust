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
    
class DonorAction(models.Model):
    ACTION_CHOICES = [
        ("email", "Email"),
        ("phone", "Phone"),
        ("message", "Message"),
    ]
    donor = models.ForeignKey(Doners, on_delete=models.CASCADE, related_name="actions")
    action_type = models.CharField(max_length=20, choices=ACTION_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor.name} - {self.action_type} @ {self.timestamp}"
