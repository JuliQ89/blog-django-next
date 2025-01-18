from ninja import Router
from .models import Post
from typing import List
from .schemas import PostSchemaOut


post_router = Router(tags=["Post"])

@post_router.get("/", response=List[PostSchemaOut])
def getPosts(request):
    return Post.objects.all()