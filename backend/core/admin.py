from django.contrib import admin
from .models import Tag, Post, Comment


class PostModelAdmin(admin.ModelAdmin):
    list_display = ["heading", "created_at", "likedCount"]

admin.site.register(Tag)
admin.site.register(Post, PostModelAdmin)
admin.site.register(Comment)