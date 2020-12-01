from app.models import db, Tag


def seed_tags():

    tag1 = Tag(name="school", user_id=1)
    tag2 = Tag(name="history", user_id=1)
    tag3 = Tag(name="food", user_id=1)
    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
