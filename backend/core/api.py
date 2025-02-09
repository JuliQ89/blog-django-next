from django.shortcuts import get_object_or_404
from ninja import Router
from .models import Post, Tag, Comment
from typing import List
from ninja_jwt.authentication import JWTAuth
from .schemas import PostSchemaOut, PostSchemaIn, TagSchemaOut, CommentSchemaOut
import uuid


# Post
post_router = Router(tags=["Post"])

@post_router.get("/", response=List[PostSchemaOut])
def getPosts(request):
    return Post.objects.all() 

@post_router.post("/", response=PostSchemaOut, auth=JWTAuth())
def createPost(request, payload: PostSchemaIn):
    post = Post.objects.create(heading=payload.heading, content=payload.content, user=request.user)
    for tag in payload.tags:
        post.tag.add(Tag.objects.get(id=tag))
    return post

# ==================== FUNKTIONIERT NOCH NICHT ==================== 
@post_router.put("/{id}/", response=PostSchemaOut, auth=JWTAuth())
def updatePostLiked(request, id:uuid.UUID):
    post = get_object_or_404(Post, id=id)
    if request.user in post.liked.all():
        post.liked.remove(request.user)
    else:
        post.liked.add(request.user)
    return post


# Comment
comment_router = Router(tags=["Comment"])

@comment_router.get("/", response=List[CommentSchemaOut])
def getComments(request):
    return Comment.objects.all()


# Tag
tag_router = Router(tags=["Tag"])

@tag_router.get("/", response=List[TagSchemaOut])
def getTags(request):
    return Tag.objects.all()