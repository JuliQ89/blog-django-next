from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=155)
    email = models.EmailField(unique=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True, default="Dieser Benutzer hat noch keine Bio.")

    def __str__(self):
        return f"{self.user.username} - Profile"
    