from app import db

class User(db.Model):
	"""用户"""
	id= db.Column(db.Interger)
