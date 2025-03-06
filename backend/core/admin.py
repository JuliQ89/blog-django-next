from django.contrib import admin
from .models import Tag, Post, Comment
from unfold.admin import ModelAdmin


class PostModelAdmin(ModelAdmin):
    list_display = ["heading", "created_at", "likedCount"]

admin.site.register(Post, PostModelAdmin)

@admin.register(Tag)
class TagAdminClass(ModelAdmin):
    pass

@admin.register(Comment)
class CommentAdminClass(ModelAdmin):
    pass

