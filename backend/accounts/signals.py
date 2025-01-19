from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Profile


@receiver(post_save, sender=User)
def createProfileForUser(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance)