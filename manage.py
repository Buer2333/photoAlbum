from app import create_app
from app.model import Photo,User
from flask.ext.script import Manager,Shell

app = create_app('default')
manage = Manager(app)

def make_Shell_context():
	return dict(app = app, User = User)
manage.add_command('shell',Shell(make_Shell_context))


if __name__ == '__main__':
	manage.run()