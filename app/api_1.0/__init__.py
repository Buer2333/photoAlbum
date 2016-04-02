from flask import Blueprint

api = Blueprint('api_1.0',__name__)
from . import users,errors