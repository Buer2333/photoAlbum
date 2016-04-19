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
    template: '#manage-view'
    //components: {
    //    'upload-img': uploadImg
    //}
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
    '/all': {
        component:all
    },
    '/human': {
        component:human
    },
    '/animal': {
        component:animal
    },
    '/city': {
        component:city
    },
    '/science': {
        component:science
    },
    '/fashion': {
        component:fashion
    },
    '/nature': {
        component:nature
    },
    '/food': {
        component:food
    },
    '/manage': {
        component: manage,
        subRoutes:{
            '/human':{
                component: human
            }
        }
    },
    '/index': {
        component:index
    }
})
router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*':"/index"//重定向任意未匹配路径到/index
});
router.start(App, '#app')