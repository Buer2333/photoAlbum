//view主视图组件
var all = Vue.extend({
    template: "#all-view"
});
var human = Vue.extend({
    template: "#human-view"
});
var animal = Vue.extend({
    template: "#animal-view"
});
var city = Vue.extend({
    template: "#city-view"
});
var science = Vue.extend({
    template: "#science-view"
});
var fashion = Vue.extend({
    template: "#fashion-view"
});
var nature = Vue.extend({
    template: "#nature-view"
});
var food = Vue.extend({
    template: "#food-view"
});
var manage = Vue.extend({
    template: '#manage-view',
    //components: {
    //    'upload-img': uploadImg
    //}
    data: function() {
        return {
            manageTitle: "相册管理",
            photoFilter: [{
                "filterName": "人物",
                "filterHref": "human"
            }, {
                "filterName": "动物",
                "filterHref": "animal"
            }, {
                "filterName": "城市",
                "filterHref": "city"
            }, {
                "filterName": "科学/技术",
                "filterHref": "science"
            }, {
                "filterName": "美妆/时尚",
                "filterHref": "fashion"
            }, {
                "filterName": "自然/旅游",
                "filterHref": "nature"
            }, {
                "filterName": "食物/饮料",
                "filterHref": "food"
            }]

        }
    }
})
var index = Vue.extend({
    template: '#index-view'

})


//vue-router根组件
var App = Vue.extend({
})
//vue-router配置
var router = new VueRouter()
router.map({
    '/manage': {
        name: "相册管理",
        component: manage,
        subRoutes:{
            '/human':{
                name: "人物",
                component: human
            },
            '/animal':{
                component: animal
            },
            '/city':{
                component: city
            },
            '/science':{
                component: science
            },
            '/fashion':{
                component: fashion
            },
            '/nature':{
                component: nature
            },
            '/food':{
                component: food
            }
        }
    },
    '/index': {
        name: "首页",
        component:index,
        subRoutes:{
            '/human': {
                name: 'human',
                component:human
            },
            '/animal': {
                name: 'animal',
                component:animal
            },
            '/city': {
                name: 'city',
                component:city
            },
            '/science': {
                name: 'science',
                component:science
            },
            '/fashion': {
                name: 'fashion',
                component:fashion
            },
            '/nature': {
                name: 'nature',
                component:nature
            },
            '/food': {
                name: 'food',
                component:food
            }
        }
    }
})
router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*':"/index"//重定向任意未匹配路径到/index
});
router.start(App, '#app')