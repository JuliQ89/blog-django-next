from ninja import Schema
from datetime import datetime
from typing import List
import uuid
from accounts.schemas import UserSchemaOut


class RelationBIGINTSchema(Schema):
    id: int

class RelationUUIDSchema(Schema):
    id: uuid.UUID


# Comments
class CommentSchemaOut(Schema):
    user: UserSchemaOut
    text: str
    created_at: datetime
    post: RelationUUIDSchema
    id: int

class CommentSchemaIn(Schema):
    text: str
    post_id:uuid.UUID


# Tag
class TagSchemaOut(Schema):
    name: str
    id: int


# Posts
class PostSchemaOut(Schema):
    user: UserSchemaOut
    tag: List[TagSchemaOut]
    content: str
    heading: str
    created_at: datetime
    likedCount: int
    liked: List[RelationBIGINTSchema]
    comments: List[CommentSchemaOut]
    id: uuid.UUID

class PostSchemaIn(Schema):
    heading: str
    content: str
    tags: List[int]

