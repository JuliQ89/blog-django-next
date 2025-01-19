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
    user: RelationBIGINTSchema
    text: str
    created_at: datetime
    id: int


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


