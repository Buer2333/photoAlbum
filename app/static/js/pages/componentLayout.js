var Foo = Vue.extend({
    template: '<div class="layout">' +
    '<div class="content">' +
    '<div class="box" v-on:mouseover="mouseEnter" v-on:mouseout="mouseLeave">' +
    '<a href="img/test/u_20121025172315750264.jpg" data-uk-lightbox="{group: my-group}">' +
    '<div class="img-overflow">' +
    '<img src="img/test/u_20121025172315750264.jpg">' +
    '</div>' +
    '<div class="uk-overlay-panel">'+
    '<div class="text-content">'+
    '<div class="top">'+
    '<div class="meta">'+
    '<span class="time">aaa</span>'+
    '<span class="views">aaa</span>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="text-content">'+
    '<div class="bottom">'+
    '<div class="meta">'+
    '<span class="detail">aaa</span>'+
    '<span class="author">aaaa</span>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</a>'+
    '</div>' +
    '</div>' +
    '</div>',
    methods : {

        mouseEnter : function() {

                    $(".box").find("img").addClass('enlarge');
                    $(".box").find(".uk-overlay-panel").addClass('uk-overlay-background');
                    $(".box").find(".top").addClass('slideDown');
                    $(".box").find(".bottom").addClass('slideUp');

        },
        mouseLeave : function(){
                $(".box").find("img").removeClass('enlarge');
                $(".box").find(".uk-overlay-panel").removeClass('uk-overlay-background');
                $(".box").find(".top").removeClass('slideDown');
                $(".box").find(".bottom").removeClass('slideUp');
        }
    }
    //transition: {
    //    mouseHover : {
    //        enterClass: 'enlarge',
    //        leaveClass: 'enlarge'
    //    }
    //}
});

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})
var App = Vue.extend({
})
var router = new VueRouter()
router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
})
router.start(App, '#app')