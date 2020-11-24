from .db import db
from .note_tag import note_tags


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30))
    body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    notebook_id = db.Column(db.Integer,
                            db.ForeignKey
                            ("notebooks.id"),
                            nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    tags = db.relationship("Tag", secondary=note_tags, back_populates="notes")

    notebook = db.relationship("Notebook", back_populates="notes")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "user_id": self.user_id,
            "notebook_id": self.notebook_id,
            "created_on": self.created_on,
            "updated_on": self.created_on,
            "tags": self.tags
        }
