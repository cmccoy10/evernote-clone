from app.models import db, Note


def seed_notes():

    note1 = Note(title="Title 1", body="""Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Fusce dictum felis nec metus tincidunt, a malesuada nibh 
    faucibus. Nunc a tortor ac ligula porttitor laoreet ac tempor leo. Maecenas
    eget nulla facilisis, varius libero in, consectetur ante.""", user_id=3,
                 notebook_id=4)
    note2 = Note(title="Title 2", body="""Nulla magna orci, tincidunt in odio at,
    mattis rutrum velit. Duis convallis euismod velit ut euismod. In sagittis 
    suscipit aliquet. Proin tincidunt, risus quis ultrices suscipit, leo lectus
    sollicitudin dolor, vel consequat ipsum velit in nisi. Pellentesque 
    habitant morbi tristique senectus et netus et malesuada fames ac turpis 
    egestas.""", user_id=4, notebook_id=2)

    note3 = Note(title="Title 3", body="""Nunc eget mauris sed ligula tempor 
    varius eget eu arcu. Mauris pharetra pulvinar nulla interdum aliquam. Mauris
    cursus semper tortor quis vehicula. Praesent tincidunt sed nisl eu facilisis. 
    Quisque gravida ligula a purus ullamcorper ornare.""", user_id=1, notebook_id=3)

    note4 = Note(title="Title 4", body="""Quisque ullamcorper augue vitae congue
    porttitor. Donec molestie, turpis non pharetra sagittis, elit mauris accumsan 
    nulla, eu venenatis dolor mauris quis massa. Donec ultrices mi non pharetra
    tempus. Ut nec purus convallis, maximus turpis quis, pharetra orci.
    Quisque ut neque ac mauris tincidunt maximus eu sed lorem. """, user_id=2,
                 notebook_id=1)

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes;')
    db.session.commit()
