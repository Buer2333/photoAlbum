import os
from flask.ext.httpauth import HTTPBasicAuth
from flask import g,request,url_for,abort,session,make_response,render_template,send_file
from . import api
from flask import jsonify,Response
from ..model import User,db,Photo,PhotoAlbum
from werkzeug.utils import secure_filename
from datetime import datetime

ALLOWED_EXTENSIONS = set(['txt','pdf','png','jpg','jpeg','gif'])
UPLOAD_FOLDER = "app/photo/"

def allowed_file(file):
    if file and secure_filename(file[0].filename).rsplit('.', 1)[1] in ALLOWED_EXTENSIONS:
        filename = secure_filename(file[0].filename)
        photo_n = filename
        nowtime = datetime.now()
        filename = str(nowtime.timestamp())+secure_filename(file[0].filename)
        file[0].save(os.path.join(UPLOAD_FOLDER, filename))
        return filename
    else:
        return False

#注册用户
@api.route('/user', methods = ['POST'])
def new_user():
    email = request.form.get('email')
    password = request.form.get('password')
    name = request.form.get('name')
    if not email  or not password or not name:
        return jsonify({"error":"信息不完整"})
    user = User.query.filter_by(email = email ).first()
    if user:
        return jsonify({"error":"邮箱已存在"})
    user = User.query.filter_by(name = name ).first()
    if user:
        return jsonify({"error":"账号已存在"})
    file = request.files.getlist('image')
    filename = allowed_file(file)

    if not filename:
        user = User(email = email,name=name)
    else:
        user = User(email = email,name=name,portrait_url=filename)
    user.setpassword(password)
    db.session.add(user)
    db.session.commit()
    token = user.generate_auth_token()
    return jsonify({'email': user.email,'token':token.decode('utf-8'),'userId':user.id,'portrait_url':filename,'name':name})

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
    email = request.form.get('email')
    password = request.form.get('password')
    if not email  or not password:
        return jsonify({'error':"账号或者密码没有填写"})
    user = User.query.filter_by(email = email).first()
    if  user and  user.verify_password(password):
        token = user.generate_auth_token()
        return jsonify({'tpye':True,"token":token.decode('utf-8'),"email":user.email,"name":user.name,"userID":user.id})
    return jsonify({'error':"账号或密码错误"})
# 修改用户信息
@api.route('/user',methods = ['PUT'])
def edit_user():
    token = request.args.get('token')
    name = request.form.get('name')
    if not token:
        return abort(400)
    user = User.verify_auth_token(token)
    if not user:
        return abort(400)
    if name:
        user.name = name
    file = request.files.getlist('image')
    filename = allowed_file(file)
    if  filename:
        user.portrait_url = filename
    db.session.commit()
    return jsonify({'success':True})
