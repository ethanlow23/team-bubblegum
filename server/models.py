from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(200), nullable=False)

  def __init__(self, email, password):
    self.email = email
    self.password = bcrypt.generate_password_hash(password).decode('utf-8')

  def __repr__(self):
    return '<User %r>' % self.email