from app import db

class User(db.Model):
	'''用户'''
	__tablename__ ='users'
	id= db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(64), unique = True)
	password = db.Column(db.String(64))
	email = db.Column(db.String(64), unique = True)
	portrait_url = db.Column(db.String(64), unique = True)
	photos = db.relationship('Photo',backref='user')
	def __repr__(self):
		return '<User %r' % self.name
class Photo(db.Model):
	"""照片"""
	__tablename__ ='photos'
	id= db.Column(db.Integer, primary_key = True)
	title = db.Column(db.String(64))
	content = db.Column(db.String(64))
	time = db.Column(db.DateTime)
	photo_url = db.Column(db.String(64), unique = True)
	user_id =db.Column(db.Integer,db.ForeignKey('users.id'))
	def __repr__(self):
		return '<Photo %r' % self.name