//view主视图组件

var manage = Vue.extend({
    template: '#manage-view',
    //components: {
    //    'upload-img': uploadImg
    //}
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

var index = Vue.extend({
    template: '#index-view',

})


//vue-router根组件
var App = Vue.extend({
})
//vue-router配置
var router = new VueRouter()
router.map({
    '/manage': {
        name: "相册管理",
        component: manage
        //subRoutes:{
        //    '/:filterHref': {
        //        component: manageFilter
        //    }
        //    //'/human':{
        //    //    name: "人物",
        //    //    component: human
        //    //},
        //    //'/animal':{
        //    //    component: animal
        //    //},
        //    //'/city':{
        //    //    component: city
        //    //},
        //    //'/science':{
        //    //    component: science
        //    //},
        //    //'/fashion':{
        //    //    component: fashion
        //    //},
        //    //'/nature':{
        //    //    component: nature
        //    //},
        //    //'/food':{
        //    //    component: food
        //    //}
        //}
    },
    '/manage/:filterHref': {
        component: manage
    },
    '/': {
        name: "首页",
        component:index
    },
    '/:filterHref': {
        component: index
    }
})
router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*':"/index"//重定向任意未匹配路径到/index
});
router.start(App, '#app')