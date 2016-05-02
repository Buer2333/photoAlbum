from app import db,app
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired,BadPayload)

class User(db.Model):
	'''用户'''
	__tablename__ ='users'
	id= db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(64), unique = True)
	password_hash = db.Column(db.String(64))
	email = db.Column(db.String(64), unique = True)
	portrait_url = db.Column(db.String(64), unique = True)
	photos = db.relationship('Photo',backref='user')

	def generate_auth_token(self, expiration = 36000):
		s = Serializer('dx',expires_in = expiration)
		return s.dumps({'id':self.id})

	@property
	def password(self):
	    return AttributeError('密码不可读')
	def setpassword(self,password):
		self.password_hash = generate_password_hash(password)
	@password.setter
	def password(self,password):
		self.password_hash = generate_password_hash(password)

	def verify_password(self, password):
		return check_password_hash(self.password_hash, password)
	def __repr__(self):
		return 'User %s' % self.name

	@staticmethod
	def verify_auth_token(token):
		s = Serializer('dx')
		try:
			data = s.loads(token)
		except SignatureExpired:
			return None
		except BadSignature:
			return None
		else:
			user = User.query.get(data['id'])
			return user


class PhotoAlbum(db.Model):
	"""相册"""
	__tablename__ = "photo_album"
	id = db.Column(db.Integer, primary_key = True)
	category = db.Column(db.String)
	category_image_url = db.Column(db.String)
	photos = db.relationship('Photo',backref='photo_album')
	def to_json(self):
		return{
		"cartegory_name":self.category,
		"category_image":self.category_image_url,
		"categoryID":self.id
		}

class Photo(db.Model):
	"""照片"""
	__tablename__ ='photos'
	id= db.Column(db.Integer, primary_key = True)
	title = db.Column(db.String(64))
	content = db.Column(db.String(64))
	time = db.Column(db.DateTime)
	photo_url = db.Column(db.String(64), unique = True)
	photo_Album_id =db.Column(db.Integer,db.ForeignKey('photo_album.id'))
	photo_user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
	def __repr__(self):
		return '<Photo %r' % self.name
	def to_json(self):
		return{
		"title":self.title,
		"content":self.content,
		"Photo_url":'api/photo/'+self.photo_url,
		'tag':self.photo_Album_id,
        'id':self.id
		}
