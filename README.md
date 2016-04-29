#photoAlbum

api介绍
----
###用户###
1. **用户注册**
    http://127.0.0.1:5000/api/user     POST
    必要参数
    - email:账号
    - password:密码
    成功返回token:
    ```javascript
    {
      "token": "eyJpYXQiOjE0NjE5NDA1ODgsImV4cCI6MTQ2MTk3NjU4OCwiYWxnIjoiSFMyNTYifQ.eyJpZCI6Mn0.5DgH1cOYM8_2KXKkuZFahyfzo__xgRvTR4UAkdDtFKg",
      "tpye": true
    }
    ```
    失败返回:
    ```javascript
    {
      "tpye": false
    }
    ```
2. **获取用户数据**
    http://127.0.0.1:5000/api/user     GET
    必要参数
    - token:令牌

3. **获取token**
    http://127.0.0.1:5000//api/token    POST
    必要参数
    - email:账号
    - password:密码
     成功返回token:
        ```javascript
        {
          "token": "eyJpYXQiOjE0NjE5NDA1ODgsImV4cCI6MTQ2MTk3NjU4OCwiYWxnIjoiSFMyNTYifQ.eyJpZCI6Mn0.5DgH1cOYM8_2KXKkuZFahyfzo__xgRvTR4UAkdDtFKg",
          "tpye": true
        }
        ```
        失败返回:
        ```javascript
        {
          "tpye": false
        }
        ```
###照片###
1. **添加照片**
    http://127.0.0.1:5000/api/photo  POST
    必要参数
    - token:令牌
    - category_id:分类id
    可选参数
    - photo_name:图片标题
    - photo_content: 图片介绍

2. **更新图片**
    http://127.0.0.1:5000/api/photo/图片id  PUT
    例如http://127.0.0.1:5000/api//photo/1
    必要参数
    - token:令牌
    - photo_name:图片标题
    - photo_content: 图片介绍

3. **删除图片**
    http://127.0.0.1:5000/api/photo/图片id  DELETE
    例如http://127.0.0.1:5000/api/photo/1
    必要参数
    - token:令牌

4. **获取图片**
    http://127.0.0.1:5000/api/photo/图片名称 GET
    例如 http://127.0.0.1:5000/api/photo/1461939130.647104IMG_0122.jpg

5. **#获取分类图片**
    http://127.0.0.1:5000/api/photos GET
    可选参数
    - count:获取图片数量默认10
    - offset: 图片偏移量默认0
    - tag: 分类图片id 默认获取所以图片

6. **#获取用户分类图片**
    http://127.0.0.1:5000/api/photos/用户id GET
    可选参数
    - count:获取图片数量默认10
    - offset: 图片偏移量默认0
    - tag: 分类图片id 默认获取所以图片
7. **#获取所有分类**
    http://127.0.0.1:5000/api/photo_albums GET
    例如输入返回
    ```javascript
    {
      "photo_albums": [
        {
          "cartegory_name": "风景",
          "categoryID": 1,
          "category_image": null
        }
      ]
    }
    ```
