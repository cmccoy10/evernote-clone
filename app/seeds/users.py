from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(first_name='Demo', last_name="User", email='demo@aa.io',
                password='password')

    user1 = User(first_name='Bob', last_name="Smith",
                 email='bob@aa.io', password='123')
    user2 = User(first_name='Mary', last_name="Johnson",
                 email='mary@aa.io', password='123')
    user3 = User(first_name='Joe', last_name="Schmoe",
                 email='joe@aa.io', password='123')
    user4 = User(first_name='Gary', last_name="Richards",
                 email='gary@aa.io', password='123')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
