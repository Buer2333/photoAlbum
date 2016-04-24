from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from  config import config

db = SQLAlchemy()
app = Flask(__name__)
def create_app(config_name):
    app.config.from_object(config[config_name])
    app.secret_key = '1'
    config[config_name].init_app(app)
    db.init_app(app)
    from .main import main
    app.register_blueprint(main)
    from .api import api
    app.register_blueprint(api, url_prefix = '/api')
    return app

