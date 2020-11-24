from .db import db
from .note_tag import note_tags


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    notes = db.relationship("Note", secondary=note_tags, back_populates="tags")
