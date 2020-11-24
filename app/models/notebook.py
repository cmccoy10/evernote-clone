from .db import db


class Notebook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30))
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_default = db.Column(db.Boolean, default=False)

    notes = db.relationship("Note", back_populates="notebook")
