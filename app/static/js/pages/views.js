//view主视图组件

var manage = Vue.extend({
    template: '#manage-view',
    data: function() {
        return {
            count:10,
            loginEmail: sessionStorage.loginEmail || "",
            offset:0,
            tag:0,
            photo_data:[]
        }
    },
    events:{
      'edit-modal':function(index){
        var modal = UIkit.modal(".edit");
        if ( modal.isActive() ) {
            modal.hide();
        } else {
            modal.show();
        }
        modal = this.$children[0];
        modal.$data = this.photo_data[index];
        console.log('index='+index);
        console.log(modal.$data);

      },
      'delete-modal':function(index){
        this.photo_data.splice(index,1);
      }
    },
    watch:{

      'tag':function(val, oldVal){
          var that = this;
          this.photo_data = [];
        $.ajax({
            url: 'api/photos/'+sessionStorage.userId,
            type: 'get',
            data:{
              tag:val
            },
            success: function(data) {
              that.photo_data = [] ;

                data.photos.forEach( function(element, index) {
                    that.photo_data.push(element);
                });

                that.offset = data.offset;
            }
        });
      }
    },
    ready: function() {
        var that = this;
        var url = 'api/photos/'+
        sessionStorage.userId+
        '?count='+this.count+
        '&offset='+this.offset+
        '&tag='+this.tag;
        $.ajax({
            url: url,
            type: 'get',
            success: function(data) {
                data.photos.forEach( function(element, index) {
                    that.photo_data.push(element);
                    console.log(element);

                });
                that.offset = data.offset;
            }
        });
    },
    component: {
      "photo-thumb": photoThumb
    },
    methods:{
      all:function(){
        var that = this;
        this.tag = 0;
        this.offset = 0;
        var url = 'api/photos/'+
        sessionStorage.userId+
        '?count='+this.count+
        '&offset='+this.offset+
        '&tag='+this.tag;
        $.ajax({
            url: url,
            type: 'get',
            success: function(data) {
              that.photo_data = [];
                data.photos.forEach( function(element, index) {
                    that.photo_data.push(element);
                    console.log(element);

                });
                that.offset = data.offset;
            }
        });
      },
      changeTag:function(i){
        this.tag=i;
        var that = this;
        var url = 'api/photos/'+
        sessionStorage.userId+
        '?count='+this.count+
        '&offset='+this.offset+
        '&tag='+this.tag;
        $.ajax({
            url: url,
            type: 'get',
            success: function(data) {
              that.photo_data = [];
                data.photos.forEach( function(element, index) {
                    that.photo_data.push(element);
                    console.log(element);

                });
                that.offset = data.offset;
            }
        });
      }
    }
});

var index = Vue.extend({
    template: '#index-view',
    ready: function() {

        var that = this;
        $.ajax({
            url: 'api/photos',
            type: 'get',
            success: function(data) {
                data.photos.forEach( function(element, index) {
                    that.photo_data.push(element);

                });
                that.offset = data.offset;
            }
        });
    },
    watch:{

      '$route.params.tag':function(val, oldVal){
          var that = this;
        $.ajax({
            url: 'api/photos',
            type: 'get',
            data:{
              tag:val
            },
            success: function(data) {
              that.photo_data = [] ;
              console.log(data);
                data.photos.forEach( function(element, index) {
                    that.photo_data.push(element);
                });

                that.offset = data.offset;
            }
        });
      }
    },

    data: function() {
        return {
            offset : 0,
            photo_data: []
        };
    },
    component:{
        "my-box": box
    }
});
Vue.component('index-view',index);


//vue-router根组件
var App =  Vue.extend({
  name:'app',
  component: {
    "index-view": index
  }
});
    //vue-router配置
var router = new VueRouter({
    //history: true
});

router.map({
    '/manage': {
        name: "相册管理",
        component: manage
    },
    '/manage/:tag': {
        component: manage
    },
    '/': {
        name: "首页",
        component: index
    },
    '/:tag': {
        component: index
    }
});
router.redirect({ //定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*': "/" //重定向任意未匹配路径到/index
});
router.start(App, '#app');
router.app.$data={
  tag:0
};
Vue.config.debug=true;
Vue.config.devtools = true;
