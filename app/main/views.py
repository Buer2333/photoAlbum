from flask import render_template,send_file,jsonify
from . import main
from ..model import PhotoAlbum


@main.route('/')
def index():
	photo_albums = PhotoAlbum.query.all();
	if photo_albums is None:
		return jsonify({'type':'false'})
	photo_albums_Array = []
	for photo_album in photo_albums:
		photo_albums_Array.append(photo_album)

	return render_template('index.html',photo_albums=photo_albums_Array)
   # return send_file('static/index.html', mimetype='text/html')
