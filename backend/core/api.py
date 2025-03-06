from django.shortcuts import get_object_or_404
from ninja import Router, File
from ninja.files import UploadedFile
from .models import Post, Tag, Comment
from typing import List
from ninja_jwt.authentication import JWTAuth
from .schemas import PostSchemaOut, PostSchemaIn, TagSchemaOut, CommentSchemaOut, CommentSchemaIn, CommentUpdateSchemaIn
import uuid


# Post
post_router = Router(tags=["Post"])

@post_router.get("/", response=List[PostSchemaOut])
def getPosts(request):
    return Post.objects.all() 

@post_router.post("/", response=PostSchemaOut, auth=JWTAuth())
def createPost(request, payload: PostSchemaIn, image: UploadedFile = File(None)):
    post = Post.objects.create(heading=payload.heading, content=payload.content, user=request.user)
    if image:
        post.image.save(image.name, image)
    for tag in payload.tags:
        post.tag.add(Tag.objects.get(id=tag))
    return post

@post_router.put("/liked/{id}/", response=PostSchemaOut, auth=JWTAuth())
def updatePostLiked(request, id:uuid.UUID):
    post = get_object_or_404(Post, id=id)
    if request.user in post.liked.all():
        post.liked.remove(request.user)
    else:
        post.liked.add(request.user)
    return post

@post_router.put("/reading_list/{id}/", response=PostSchemaOut, auth=JWTAuth())
def updatePostAddedToReadingList(request, id:uuid.UUID):
    post = get_object_or_404(Post, id=id)
    if request.user in post.reading_list.all():
        post.reading_list.remove(request.user)
    else:
        post.reading_list.add(request.user)
    return post

@post_router.post("/{id}/", response=PostSchemaOut, auth=JWTAuth())
def updatePost(request, id:uuid.UUID, payload: PostSchemaIn, image: UploadedFile = File(None)):
    post = get_object_or_404(Post, id=id)
    post.content = payload.content
    post.heading = payload.heading
    post.tag.clear()
    if image:
        post.image.save(image.name, image)
    for tag in payload.tags:
        post.tag.add(Tag.objects.get(id=tag))
    post.save()
    return post

@post_router.delete("/{id}/", response=dict, auth=JWTAuth())
def deletePost(request, id:uuid.UUID):
    post = get_object_or_404(Post, id=id)
    post.delete()
    return {"success": True}


# Comment
comment_router = Router(tags=["Comment"])

@comment_router.get("/", response=List[CommentSchemaOut])
def getComments(request):
    return Comment.objects.all()

@comment_router.post("/", response=CommentSchemaOut, auth=JWTAuth())
def createComment(request, payload: CommentSchemaIn):
    post = get_object_or_404(Post, id=payload.post_id)
    comment = Comment.objects.create(user=request.user, text=payload.text, post=post)
    return comment

@comment_router.put("/{id}/", response=CommentSchemaOut, auth=JWTAuth())
def updateComment(request, payload: CommentUpdateSchemaIn, id:int):
    comment = get_object_or_404(Comment, id=id)
    comment.text = payload.text
    comment.save()
    return comment

@comment_router.delete("/{id}/", response=dict, auth=JWTAuth())
def deleteComment(request, id: int):
    comment = get_object_or_404(Comment, id=id)
    comment.delete()
    return {"success": True}


# Tag
tag_router = Router(tags=["Tag"])

@tag_router.get("/", response=List[TagSchemaOut])
def getTags(request):
    return Tag.objects.all()
