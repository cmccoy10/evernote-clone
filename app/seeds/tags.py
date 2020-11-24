from app.models import db, Tag


def seed_tags():

    tag1 = Tag(name="tag 1", user_id=3)
    tag2 = Tag(name="tag 2", user_id=4)
    tag3 = Tag(name="tag 3", user_id=1)
    tag4 = Tag(name="tag 4", user_id=2)
    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags;')
    db.session.commit()
