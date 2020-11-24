from app.models import db, Notebook


def seed_notebooks():

    notebook1 = Notebook(title="Notebook 1", owner_id=3)
    notebook2 = Notebook(title="Notebook 2", owner_id=4)
    notebook3 = Notebook(title="Notebook 3", owner_id=1)
    notebook4 = Notebook(title="Notebook 4", owner_id=2)
    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)

    db.session.commit()


def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE')
    db.session.commit()
