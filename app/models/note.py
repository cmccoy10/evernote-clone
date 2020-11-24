from .db import db
from .note_tag import note_tags


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30))
    body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    notebook_id = db.Column(db.Integer,
                            db.ForeignKey
                            ("notebooks.id"),
                            nullable=False)

    tags = db.relationship("Tag", secondary=note_tags, back_populates="notes")

    notebook = db.relationship("Notebook", back_populates="notes")
