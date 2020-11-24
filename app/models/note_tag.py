from .db import db


note_tags = db.Table(
    "note_tags",
    db.Column('id', db.Integer, primary_key=True),
    db.Column("note_id", db.Integer, db.ForeignKey("notes.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"))
)
