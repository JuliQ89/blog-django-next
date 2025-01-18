from ninja import Schema
from datetime import datetime
from typing import List
import uuid


class RelationBIGINTSchema(Schema):
    id: int
class RelationUUIDSchema(Schema):
    id: uuid.UUID

# Posts
class PostSchemaOut(Schema):
    user: RelationBIGINTSchema
    tag: RelationBIGINTSchema
    content: str
    heading: str
    created_at: datetime
    likedCount: int
    liked: List[RelationBIGINTSchema]
    id: uuid.UUID


# Comments
class CommentSchemaOut(Schema):
    user: RelationBIGINTSchema
    post: RelationUUIDSchema
    text: str
    created_at: datetime
    id: int

# Tag
class TagSchemaOut(Schema):
    name: str
    id: int