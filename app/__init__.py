from flask import Flask , Blueprint
from flask.ext.sqlalchemy import SQLAlchemy
from  config import config
app = Flask(__name__)
db = SQLAlchemy()




#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/data-dev'

def create_app(config_name):
	app = Flask(__name__)
	app.config.from_object(config[config_name])
	config[config_name].init_app(app)
	db.init_app(app)
	from .main import main as blueprint
	app.register_blueprint(blueprint)
	return app

