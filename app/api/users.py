import os
from flask.ext.httpauth import HTTPBasicAuth
from flask import g,request,url_for,abort,session,make_response,render_template
from . import api
from flask import jsonify
from ..model import User,db,Photo,PhotoAlbum
from werkzeug.utils import secure_filename
from datetime import datetime

UPLOAD_FOLDER = "app/static/img/"

auth = HTTPBasicAuth()
@auth.verify_password
def verify_password(email_or_token,password):
    g.token = False
    user = User.verify_auth_token(email_or_token)
    if not user:
        user = User.query.filter_by(email = email_or_token).first()
        if not user or not user.verify_password(password):
            return False
    else:
        g.token = True
    g.user = user
    return True
#添加图片
@api.route('/upload_image', methods=['POST'])
def upload_image():
    token = request.args.get('token')
    category_id= request.args.get('category_id')
    photo_name = request.args.get('photo_name','')
    photo_content = request.args.get('photo_content','')

    if not token  or not category_id:
        return jsonify({"type":False})
    user = User.verify_auth_token(token)
    if not user:
        return abort(400)
    photo_album = PhotoAlbum.query.get(category_id)
    if photo_album.user_id == user.id:
        files = request.files.getlist('file')
        if files:
            for file in files:
                filename = secure_filename(file.filename)
                nowtime = datetime.now()
                filename = str(nowtime.timestamp())+filename
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                photo = Photo(title=photo_name,content=photo_content,time=nowtime,photo_url=UPLOAD_FOLDER+filename,photo_Album_id=category_id)
                db.session.add(photo)
            db.session.commit()
            return jsonify({'type':True})
        return str('ab')
    else:
        return jsonify({'type':False})

#注册用户
@api.route('/register', methods = ['POST'])
def new_user():
    email = request.args.get('email')
    password = request.args.get('password')
    print(email)
    if not email  or not password :
        return jsonify({"email":email,"password":password})
    user = User.query.filter_by(email = email).first()
    if user is not None:
        return 'user %s' % type(user)
    user = User(email = email)
    user.setpassword(password)
    db.session.add(user)
    db.session.commit()
    token = user.generate_auth_token()
    return jsonify({'email': user.email,'token':token.decode('utf-8')})





#获取token
@api.route('/token',methods = ['POST'])
def get_token():
    email = request.args.get('email')
    password = request.args.get('password')
    if not email  or not password:
        return jsonify({"email":email,"password":password,'fist':'1'})
    user = User.query.filter_by(email = email).first()
    if not user or  user.verify_password(password) is None:
        return jsonify({"email":email,"password":password,'fist':'2'})
    token = user.generate_auth_token()
    return jsonify({"token":token.decode('utf-8')})

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
#获取所有图片
@api.route('/all_images',methods= ['GET'])
def get_all_images():
    count = int(request.args.get('count',10))
    offset = int(request.args.get('offset',0))
    photos = Photo.query.order_by('-time').limit(count).offset(offset)
    if photos is  None:
        return jsonify({"messig":"没有更多图片了"})
    offset = count+offset
    photos_array = []
    for photo in photos:
        photos_array.append(photo.to_json())

    return jsonify({"offset":offset,"photos":photos_array})

#获取用户所有分类
@api.route('/all_photo_album/<int:userID>')
def all_photo_album(userID):
    photo_albums = User.query.get(userID).photo_albums
    if photo_albums is None:
        return jsonify({'type':'false'})
    photo_albums_Array = []
    for photo_album in photo_albums:
        photo_albums_Array.append(photo_album.to_json())

    return jsonify({"photo_albums":photo_albums_Array})

#获取用户分类图片
@api.route('/all_photo/<int:photo_albumID>')
def get_user_photos(photo_albumID):
    count = int(request.args.get('count',10))
    offset = int(request.args.get('offset',0))
    photos = Photo.query.filter_by(photo_Album_id=photo_albumID).limit(count).offset(offset)
    photos_array = []
    for photo in photos:
        photos_array.append(photo.to_json())
    return jsonify({"offset":offset,"photos":photos_array})

@api.route('/add_photo_album',methods = ['POST'])
#添加用户分类
def add_photo_album():
    token = request.args.get('token')
    category_name = request.args.get('category_name')
    if not token or not category_name:
        return jsonify({"category_name":category_name,"token":token})
    user = User.verify_auth_token(token)
    if not user:
        return abort(400)
    photo_album = PhotoAlbum(user_id=user.id,category=category_name)
    db.session.add(photo_album)
    db.session.commit()
    return jsonify({"type":"success"})

