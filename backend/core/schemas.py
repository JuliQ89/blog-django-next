from ninja import Schema
from datetime import datetime
from typing import List, Optional
from accounts.schemas import UserSchemaOut
from typing import Optional
import uuid


class RelationBIGINTSchema(Schema):
    id: int

class OptionalRelationSchema(Schema):
    id: Optional[int] = None

class RelationUUIDSchema(Schema):
    id: uuid.UUID


# Comments
class CommentSchemaOut(Schema):
    user: UserSchemaOut
    text: str
    created_at: datetime
    post: RelationUUIDSchema
    id: int

class CommentUpdateSchemaIn(Schema):
    text: str

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
    image: Optional[str] = None
    content: str
    heading: str
    created_at: datetime
    likedCount: int
    liked: List[RelationBIGINTSchema]
    comments: List[CommentSchemaOut]
    reading_list: List[UserSchemaOut]
    id: uuid.UUID


class PostSchemaIn(Schema):
    heading: str
    content: str
    tags: List[int]
