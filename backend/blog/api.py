from ninja import NinjaAPI
from core.api import post_router, tag_router, comment_router

api = NinjaAPI()

api.add_router("posts", post_router)
api.add_router("comments", comment_router)
api.add_router("tags", tag_router)