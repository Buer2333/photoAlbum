import os
from flask.ext.httpauth import HTTPBasicAuth
from flask import g,request,url_for,abort,session,make_response,render_template,send_file
from . import api
from flask import jsonify
from ..model import User,db,Photo,PhotoAlbum
from werkzeug.utils import secure_filename
from datetime import datetime
UPLOAD_FOLDER = "app/photo/"

#添加图片
@api.route('/photo', methods=['POST'])
def upload_image():
    token = request.args.get('token')
    category_id= request.form.get('category_id')
    photo_name =  request.form.get('photo_name','')
    photo_content = request.form.get('photo_content','')

    if not token  or not category_id:
        return jsonify({"error":'没有token或者分类','content':'token无效或者相册分类无效','id':category_id})
    user = User.verify_auth_token(token)
    if not user:
        return jsonify({'error':'token错误','content':'token无效','userid':user.email})
    photo_album = PhotoAlbum.query.get(category_id)
    files = request.files.getlist('image')
    if files:
        for file in files:
            filename = secure_filename(file.filename)
            nowtime = datetime.now()
            filename = str(nowtime.timestamp())+filename
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            photo = Photo(title=photo_name,content=photo_content,time=nowtime,photo_url=filename,photo_Album_id=category_id,photo_user_id=user.id)
            db.session.add(photo)
        db.session.commit()
        return jsonify({'type':True})
    return jsonify({'error':'上传失败'})

#获取图片
@api.route('/photo/<string:photo_url>')
def get_photo(photo_url):
    image = send_file('photo/'+photo_url, mimetype='image/gif')
    if image:
        return image


#更新图片
@api.route('/photo/<int:photo_id>' ,methods = ['PUT'])
def put_photot(photo_id):
    token = request.args.get('token')
    photo_name =  request.form.get('photo_name','')
    photo_content = request.form.get('photo_content','')
    # return jsonify({'token':token,'name':photo_name,"content":photo_content})
    if not token and photo_name != '' and photo_content != '':
        return jsonify({"type":False,'content':'token无效'})
    photo = Photo.query.get(photo_id)
    user = User.verify_auth_token(token)
    if not user:
        return jsonify({'error':'token错误','content':'token无效','userid':user.email})
    if photo.photo_user_id == user.id:
        photo.title = photo_name
        photo.content = photo_content
        db.session.commit()
        return jsonify({"type":True})
    else:
        return jsonify({"error":'你没有权限修改别人的照片'})

#删除图片

@api.route('/photo/<int:photo_id>',methods = ['DELETE'])
def delete_photo(photo_id):
    token = request.args.get('token')

    if not token :
        return jsonify({"type":False,'content':'token无效'})
    photo = Photo.query.get(photo_id)
    user = User.verify_auth_token(token)
    a = photo.photo_user_id;
    if photo.photo_user_id == user.id:
        db.session.delete(photo)
        return jsonify({"type":True})
    else:
        return jsonify({"error":'你没有权限修改别人的照片',"photo":a,"user":user.id})

            # photoFilter: [{
            #     "filterName": "人物",
            #     "filterHref": "Human"
            # }, {
            #     "filterName": "动物",
            #     "filterHref": "Animal"
            # }, {
            #     "filterName": "城市",
            #     "filterHref": "City"
            # }, {
            #     "filterName": "科学/技术",
            #     "filterHref": "Science"
            # }, {
            #     "filterName": "美妆/时尚",
            #     "filterHref": "Fashion"
            # }, {
            #     "filterName": "自然/旅游",
            #     "filterHref": "Nature"
            # }, {
            #     "filterName": "食物/饮料",
            #     "filterHref": "Food"
            # }]
#获取所有图片
@api.route('/photos',methods= ['GET'])
def get_all_images():
    count = int(request.args.get('count',10))
    offset = int(request.args.get('offset',0))
    tag =  int(request.args.get('tag',0))
    if tag == 0:
        photos = Photo.query.order_by('-time').limit(count).offset(offset)
    else:
        photos = Photo.query.filter_by(photo_Album_id=tag).order_by('-time').limit(count).offset(offset)
    if photos is  None:
        return jsonify({"messig":"没有更多图片了"})

    photos_array = []
    for photo in photos:
        photos_array.append(photo.to_json())
    count = len(photos_array)
    offset = count+offset+1
    return jsonify({"offset":offset,"photos":photos_array})

#获取所有分类
@api.route('/photo_albums')
def all_photo_album():
    photo_albums = PhotoAlbum.query.all();
    if photo_albums is None:
        return jsonify({'type':'false'})
    photo_albums_Array = []
    if len(photo_albums_Array)==0:
        return jsonify({'error':'没有更多图片'})
    for photo_album in photo_albums:
        photo_albums_Array.append(photo_album.to_json())
    return jsonify({"photo_albums":photo_albums_Array})


#获取用户分类图片
@api.route('/photos/<int:userID>')
def get_user_photos(userID):
    count = int(request.args.get('count',10))
    offset = int(request.args.get('offset',0))
    photo_albumid = int(request.args.get('tag',0))
    if photo_albumid == 0:
        photos = Photo.query.filter_by(photo_user_id=userID).order_by('-time').limit(count).offset(offset)
    else:
        photos = Photo.query.filter_by(photo_Album_id=photo_albumid,photo_user_id=userID).order_by('-time').limit(count).offset(offset)
    photos_array = []
    for photo in photos:
        photos_array.append(photo.to_json())
    return jsonify({"offset":offset,"photos":photos_array})
