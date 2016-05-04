//box组件
var box = Vue.extend({
    template: "#index-box",
    methods: {

        mouseEnter: function() {
            var el = event.currentTarget;

            $(el).find("img").addClass('enlarge');
            $(el).find(".uk-overlay-panel").addClass('uk-overlay-background');
            $(el).find(".top").addClass('slideDown');
            $(el).find(".bottom").addClass('slideUp');

        },
        mouseLeave: function() {
            var el = event.currentTarget;

            $(el).find("img").removeClass('enlarge');
            $(el).find(".uk-overlay-panel").removeClass('uk-overlay-background');
            $(el).find(".top").removeClass('slideDown');
            $(el).find(".bottom").removeClass('slideUp');
        }
    },
    props: ['dataBind']
})
Vue.component('my-box', box);
new Vue({
        el: ".content"
    })
    //photo-Thumb组件
var photoThumb = Vue.extend({
    template: "#photo-thumb",
    methods: {
        mouseEnter: function(event) {
            this.show = true
        },
        mouseLeave: function(event) {
            this.show = false
        },
        editPhoto: function() {
            this.$dispatch('edit-modal', this.index);

        },
        deletePhoto: function() {
            var that = this;
            $.ajax({
                url: "api/photo/" + that.dataBind.id + "?token=" + sessionStorage.tokenData,
                type: "delete",
                success: function(data) {
                    if (data.type) {
                        that.$dispatch('delete-modal', this.index);
                    //
                    }
                    console.log(data)
                }
            });
        }
    },
    data: function() {
        return {
            show: false
        }
    },
    props: ['dataBind', 'index']
});
Vue.component('photo-thumb', photoThumb);
new Vue({
        el: ".uk-thumbnav"
    })
    //left-sidebar组件
var leftSidebar = Vue.extend({
    template: "#sidebar-container",
    data: function() {
        return {
            loginEmail: sessionStorage.loginEmail || ""

        }
    },
    methods: {
        changeView: function(i) {
            router.app.tag = i;
        }
    }
})


Vue.component('left-sidebar', leftSidebar);
//loginModal组件
var loginModal = new Vue({
        el: ".login-modal",
        data: {
            user_email: "",
            user_password: ""
        },
        methods: {
            login: function() {
                var _this = this;
                var user_email = _this.user_email;
                var user_password = this.user_password;
                console.log(user_email + "" + user_password);
                $.ajax({
                    url: 'api/token',
                    type: 'post',
                    data: {
                        email: _this.user_email,
                        password: _this.user_password
                    },
                    success: function(data) {
                        if (data.error == null) {
                            //登陆成功
                            var modal = UIkit.modal(".login-modal");
                            modal.hide();
                            sessionStorage.loginEmail = data.email;
                            sessionStorage.tokenData = data.token;
                            sessionStorage.userId = data.userID;
                            location.reload()
                        } else {
                            console.log("failed!");
                        }
                    }
                })
            }
        }
    })
    //logoutModal组件
var logoutModal = new Vue({
        el: ".logout-modal",
        methods: {
            logout: function() {
                sessionStorage.clear();
                location.reload();
            }
        }
    })
    //registerModal组件
var registerModal = new Vue({
    el: ".register-modal",
    data: {
        user_email: "",
        user_password: ""
    },
    methods: {
        register: function() {
            var _this = this;
            var user_email = _this.user_email;
            var user_password = this.user_password;
            $.ajax({
                url: 'api/user',
                type: 'post',
                data: {
                    email: _this.user_email,
                    password: _this.user_password
                },
                success: function(data) {
                    if (data.error == null) {
                        //注册成功
                        sessionStorage.tokenData = data.token;
                        sessionStorage.loginEmail = data.email;
                        sessionStorage.userId = data.userID;
                        location.reload()
                    } else {
                        //失败
                    }
                }
            })
        }
    }
})
var modal = Vue.extend({
        template: "#photoModal",
        data: function() {
            return {
                title: "",
                content: "",
                tag: ""
            }
        },
        props: ['photo'],
        methods: {
            "editPhoto": function() {
                var that = this;
                $.ajax({
                    url: "api/photo/" + that.id + "?token=" + sessionStorage.tokenData,
                    type: "put",
                    data: {
                        "photo_name": that.title,
                        "photo_content": that.content
                    },
                    success: function(data) {
                        console.log(data);
                    }
                })
            }
        }
    }

);
Vue.component('app-modal', modal);
