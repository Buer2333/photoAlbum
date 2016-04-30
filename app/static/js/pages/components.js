//box组件
var box = Vue.extend({
    template: "#index-box",
    methods : {

        mouseEnter : function() {
            var el = event.currentTarget;

            $(el).find("img").addClass('enlarge');
            $(el).find(".uk-overlay-panel").addClass('uk-overlay-background');
            $(el).find(".top").addClass('slideDown');
            $(el).find(".bottom").addClass('slideUp');

        },
        mouseLeave : function(){
            var el = event.currentTarget;

            $(el).find("img").removeClass('enlarge');
            $(el).find(".uk-overlay-panel").removeClass('uk-overlay-background');
            $(el).find(".top").removeClass('slideDown');
            $(el).find(".bottom").removeClass('slideUp');
        }
    }
})
Vue.component('my-box',box);
new Vue({
    el: ".content"
})
//photo-Thumb组件
var photoThumb = Vue.extend({
    template: "#photo-thumb",
    methods : {

        mouseEnter : function(event) {
            //var el = event.currentTarget;
            //$(el).find(".photo-op").show()
            //return false
            this.show = true

        },
        mouseLeave : function(event){
            //var el = event.currentTarget;
            //$(el).find(".photo-op").hide();
            //return false
            this.show = false

        }
    },
    data : function () {
        return { show: false }
    }

})
Vue.component('photo-thumb',photoThumb);
new Vue({
    el: ".uk-thumbnav"

})
//left-sidebar组件
var leftSidebar = Vue.extend({
    template: "#sidebar-container",
    data: function() {
        return {
            photoFilter: [{
                "filterName": "人物",
                "filterHref": "Human"
            }, {
                "filterName": "动物",
                "filterHref": "Animal"
            }, {
                "filterName": "城市",
                "filterHref": "City"
            }, {
                "filterName": "科学/技术",
                "filterHref": "Science"
            }, {
                "filterName": "美妆/时尚",
                "filterHref": "Fashion"
            }, {
                "filterName": "自然/旅游",
                "filterHref": "Nature"
            }, {
                "filterName": "食物/饮料",
                "filterHref": "Food"
            }]

        }
    }
})
Vue.component('left-sidebar',leftSidebar);
//upload-img组件
new Vue({
    el: ".login-modal",
    data: {
        user_email: "",
        user_password: ""
    },
    methods: {
        login: function(){
            var _this = this;
            var user_email = this.user_email;
            var user_password = this.user_password;
            $.ajax({
                url:'js/pages/data.json',
                type:'get',
                data:{
                    user_email:user_email,
                    user_password:user_password
                },
                success:function(data){
                    //if(data.iserro){
                    //    _this.erro.iserro = true;
                    //    _this.erro.text = data.msg;
                    //    _this.erro.target = data.data.target;
                    //    return;
                    //}
                    //localStorage.userInfo = JSON.stringify(data.data);
                    //if(_this.remember){
                    //    localStorage.remember = _this.remember;
                    //}else{
                    //    localStorage.remember = false;
                    //}
                    //router.go('/list');
                    console.log(data)
                }
            })
            //$.get('data.json',function (data){


        }
    }
})
