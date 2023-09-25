from django.db import models
from django.contrib.auth.models import User

class MagicLinkToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    token = models.CharField(max_length=32, unique=True)
    email = models.EmailField()  # Add this field

    def __str__(self):
        return f"MagicLinkToken({self.user}, {self.token})"
