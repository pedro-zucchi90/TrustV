from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    date = db.Column(db.Date, nullable=False)
    profile_pic = db.Column(db.String(120), nullable=True)

    def __repr__(self):
        return f"<Users('{self.name}', '{self.email}')>" 