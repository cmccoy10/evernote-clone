from app.models import db, Notebook


def seed_notebooks():

    notebook1 = Notebook(title="First Notebook", owner_id=1, is_default=True)
    notebook2 = Notebook(title="History", owner_id=1)
    notebook3 = Notebook(title="To Do", owner_id=1)
    notebook4 = Notebook(title="Economics", owner_id=1)
    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)

    db.session.commit()


def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE')
    db.session.commit()
