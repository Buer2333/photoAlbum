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
//photo-view组件
var photoView = Vue.extend({
    template: "#photo-view",
    methods : {

        mouseEnter : function(event) {
            //var el = event.currentTarget;
            //$(el).find(".photo-op").show()
            //return false
            this.show = true
            console.log(this.show)
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
Vue.component('photo-view',photoView);
new Vue({
    el: ".uk-thumbnav"

})
//upload-img组件
