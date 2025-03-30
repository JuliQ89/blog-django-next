from ninja import Schema
from datetime import datetime


class ProfileSchemaOut(Schema):
    image: str | None = None
    bio: str
    id: int


class UserSchemaOut(Schema):
    username: str
    first_name: str 
    last_name: str
    is_staff: bool
    email: str
    joined_at: datetime
    is_authenticated: bool
    profile: ProfileSchemaOut
    id: int


class LoginSchema(Schema):
    email: str
    password: str


class RefreshTokenSchema(Schema):
    refresh_token: str


class CreateUserSchema(Schema):
    username: str
    email: str
    password: str    
