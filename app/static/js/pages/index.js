// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry
var $grid = $('.content').masonry({
    itemSelector: '.box',
    percentPosition: true,
    columnWidth: 5
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
    $grid.masonry();
});

//切换sidebar
$(".icon-base").on('click',function(event){
    event.stopPropagation();
    $(".pusher").addClass('dimmed');
    $(".left-sidebar").addClass('visible');
    var visibility = $(".left-sidebar").css('visibility');
    if (visibility == 'visible'){
        $(".pusher").on('click',function(){
            $(".pusher").removeClass('dimmed');
            //$(".left-sidebar").removeClass('visible');
        })
    }
});
//box的hover效果
//var figcaption = $('<div class="uk-overlay-panel uk-overlay-background"></div>')

$(document).ready(function(){
    //$(".box").hover(function(){
    //    $(this).children().append(figcaption).addClass("uk-overlay")
    //},function(){
    //    $(this).children().remove(figcaption).removeClass("uk-overlay")
    //})
    $(".box").hover(function(){
        $(this).find("img").addClass('enlarge');
        $(this).find(".uk-overlay-panel").addClass('uk-overlay-background');
        $(this).find(".top").addClass('slideDown');
        $(this).find(".bottom").addClass('slideUp');
    },function(){
        $(this).find("img").removeClass('enlarge');
        $(this).find(".uk-overlay-panel").removeClass('uk-overlay-background');
        $(this).find(".top").removeClass('slideDown');
        $(this).find(".bottom").removeClass('slideUp');
    })
})



