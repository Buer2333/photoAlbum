import os
from flask.ext.httpauth import HTTPBasicAuth
from flask import g,request,url_for,abort,session,make_response,render_template,send_file
from . import api
from flask import jsonify
from ..model import User,db,Photo,PhotoAlbum
from werkzeug.utils import secure_filename
from datetime import datetime


#注册用户
@api.route('/user', methods = ['POST'])
def new_user():
    email = request.args.get('email')
    password = request.args.get('password')
    print(email)
    if not email  or not password :
        return jsonify({"email":email,"password":password})
    user = User.query.filter_by(email = email).first()
    if user:
        return 'user %s' % type(user)
    user = User(email = email)
    user.setpassword(password)
    db.session.add(user)
    db.session.commit()
    token = user.generate_auth_token()
    return jsonify({'email': user.email,'token':token.decode('utf-8')})

#获取用户信息
@api.route('/user',methods = ['GET'])
def get_user():
    token = request.args.get('token')
    if not token:
        return abort(400)
    user = User.verify_auth_token(token)
    if not user:
        return abort(400)
    return jsonify({"email":user.email,"name":user.name,"userID":user.id})


#获取token
@api.route('/token',methods = ['POST'])
def get_token():
    email = request.args.get('email')
    password = request.args.get('password')
    if not email  or not password:
        return jsonify({'type':False})
    user = User.query.filter_by(email = email).first()
    if  user and  user.verify_password(password):
        token = user.generate_auth_token()
        return jsonify({'tpye':True,"token":token.decode('utf-8')})
    return jsonify({'type':False})




