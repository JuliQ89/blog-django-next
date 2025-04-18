from ninja import Router, Schema
from django.contrib.auth import authenticate
from .schemas import LoginSchema, RefreshTokenSchema, CreateUserSchema, UserSchemaOut
from ninja_jwt.tokens import RefreshToken
from .models import User
from core.schemas import PostSchemaOut
from typing import List


auth_router = Router(tags=["Auth"]) 

@auth_router.post("/obtain", auth=None)
def login(request, payload: LoginSchema):
    user = authenticate(email=payload.email, password=payload.password)
    if user is not None:
        refresh_token = RefreshToken.for_user(user)
        refresh_token['user'] = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
            'joined_at': str(user.joined_at),
            'is_authenticated': user.is_authenticated,
            'email': user.email,
            'profile' : {
                'image': str(user.profile.image), 
                'bio': user.profile.bio,
                'id': user.profile.id,
            },
            'id': user.id,
        }
        access_token = str(refresh_token.access_token)

        return {'access_token': str(access_token), 'refresh_token': str(refresh_token)}
    return {"error", "Invalid credentials"}, 401


@auth_router.post("/refresh", auth=None)
def refresh(request, payload: RefreshTokenSchema):
 try:
    refresh = RefreshToken(payload.refresh_token)
    return {"access_token": str(refresh.access_token)}
 except Exception as e:
    return {"error": "Invalid refresh token"}, 401
 

@auth_router.post("/create_user", response=UserSchemaOut ,auth=None)
def createUser(request, payload: CreateUserSchema):
   user = User.objects.create(username=payload.username, email=payload.email)
   user.set_password(payload.password)
   user.save()

   return user

class UserPostsSchema(Schema):
    user: UserSchemaOut
    posts: List[PostSchemaOut]


@auth_router.get("/user/{id}/", response=UserPostsSchema)
def getUserData(request, id: int):
   user = User.objects.get(id=id)
   posts = user.posts
   return {"user": user, "posts": posts}

@auth_router.get("/users/", response=List[UserSchemaOut])
def getUsers(request):
    users = User.objects.all()
    return users