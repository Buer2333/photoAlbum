from app import create_app
from app.model import Photo,User
from flask.ext.script import Manager,Shell

app = create_app('default')
manage = Manager(app)

if __name__ == '__main__':
	manage.run()