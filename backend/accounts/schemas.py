from ninja import Schema
from datetime import datetime


class UserSchemaOut(Schema):
    username: str
    first_name: str 
    last_name: str
    joined_at: datetime
    id: int


class ProfileSchemaOut(Schema):
    user: UserSchemaOut
    image: str | None = None
    bio: str


class LoginSchema(Schema):
    email: str
    password: str


class RefreshTokenSchema(Schema):
    refresh_token: str


class CreateUserSchema(Schema):
    username: str
    email: str
    password: str    