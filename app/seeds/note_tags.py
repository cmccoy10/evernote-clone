from app.models import db, Note, Tag


def seed_note_tags():
    new_note1 = Note(title="Title 5", body="""Fusce dictum felis nec metus 
    tincidunt, a malesuada nibh faucibus. Nunc a tortor ac ligula porttitor 
    laoreet ac tempor leo. Maecenas eget nulla facilisis, varius libero in, 
    consectetur ante.""", user_id=4, notebook_id=2)
    new_tag1 = Tag(name="tag 5", user_id=4)
    new_tag1.notes.append(new_note1)
    db.session.add(new_note1)
    db.session.commit()

    new_note2 = Note(title="Title 6", body="""Fusce dictum felis nec metus 
    tincidunt, a malesuada nibh faucibus. Nunc a tortor ac ligula porttitor 
    laoreet ac tempor leo. Maecenas eget nulla facilisis, varius libero in, 
    consectetur ante.""", user_id=1, notebook_id=3)
    new_tag2 = Tag(name="tag 6", user_id=1)
    new_tag2.notes.append(new_note2)
    db.session.add(new_note2)
    db.session.commit()

    new_note3 = Note(title="Title 7", body="""Fusce dictum felis nec metus 
    tincidunt, a malesuada nibh faucibus. Nunc a tortor ac ligula porttitor 
    laoreet ac tempor leo. Maecenas eget nulla facilisis, varius libero in, 
    consectetur ante.""", user_id=4, notebook_id=2)
    new_tag3 = Tag(name="tag 7", user_id=4)
    new_tag3.notes.append(new_note3)
    db.session.add(new_note3)
    db.session.commit()


def undo_note_tags():
    db.session.execute('TRUNCATE note_tags RESTART IDENTITY CASCADE;')
    db.session.commit()
