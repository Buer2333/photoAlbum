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
})
$(document).ready(function(){

})



