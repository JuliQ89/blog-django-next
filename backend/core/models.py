from django.db import models
from accounts.models import User


class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    heading = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    liked = models.ManyToManyField(User, related_name="user_liked")

    @property
    def likedCount(self):
        return self.liked.count()

    def __str__(self):
        return self.heading


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.created_at}"