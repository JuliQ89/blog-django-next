from ninja import NinjaAPI
from core.api import post_router

api = NinjaAPI()

api.add_router("posts", post_router)