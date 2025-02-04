from ninja import Router
from .models import Post, Tag, Comment
from typing import List
from .schemas import PostSchemaOut, TagSchemaOut, CommentSchemaOut


# Post
post_router = Router(tags=["Post"])

@post_router.get("/", response=List[PostSchemaOut])
def getPosts(request):
    return Post.objects.all() 


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