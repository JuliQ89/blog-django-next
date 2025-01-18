from ninja import Schema
from datetime import datetime
from typing import List


class RelationSchema(Schema):
    id: int

# Posts
class PostSchemaOut(Schema):
    user: RelationSchema
    tag: RelationSchema
    content: str
    heading: str
    created_at: datetime
    likedCount: int
    liked: List[RelationSchema]