from flask import Flask 
from flask.ext.script import Manager
from flask.ext.sqlalchemy import SQLAlchemy
import os
#from config import config
#
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
#db = SQLAlchemy()
#config['default'].init_app(app)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/data-dev'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'+os.path.join(basedir,'data-dev.sqlite')
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
db  = SQLAlchemy(app)
mon = Manager(app)
class User(db.Model):
	__tablename__ ='users'
	id= db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(64), unique = True)
	password = db.Column(db.String(64),)
	email = db.Column(db.String(64), unique = True)
	portrait_url = db.Column(db.String(64), unique = True)
	photos = db.relationship('Photo',backref='user')
	def __repr__(self):
		return '<User %r' % self.name
class Photo(db.Model):
	"""用户"""
	__tablename__ ='photos'
	id= db.Column(db.Integer, primary_key = True)
	title = db.Column(db.String(64),)
	content = db.Column(db.String(64),)
	time = db.Column(db.String(64), )
	photo_url = db.Column(db.String(64), unique = True)
	user_id =db.Column(db.Integer,db.ForeignKey('users.id'))
	def __repr__(self):
		return '<Photo %r' % self.name

@app.route('/')
def index():
	return " "

if __name__=='__main__':
	mon.run()