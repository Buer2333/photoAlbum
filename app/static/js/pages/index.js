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
        $(".pusher").on('click',function(){
            if (visibility == 'visible'){
                $(".pusher").removeClass('dimmed');
                setTimeout(function(){
                    $(".left-sidebar").removeClass('visible')
                },500)
            }

        })
});


//box的hover效果
//var figcaption = $('<div class="uk-overlay-panel uk-overlay-background"></div>')


//toggle-sidebar监听浏览器高度变化
$(document).ready(function(){
var scrolling;
document.addEventListener("scroll", setScroll, false);
document.addEventListener("mousewheel", setScroll, false);
function setScroll(){
    scrolling = true;
}
    function animateOnScroll(){
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        if (scrolling){
            var scrollPosition = window.scrollY;
            $(".header-bg").css({
                transform: 'translate3d(0px,' + scrollPosition / 2 + 'px,0px)'
            });
            $(".header-bg-wrapper").css({
                transform: 'translate3d(0px,' + scrollPosition / 4 + 'px,0px)'
            })
            if (scrollPosition>70){
                $(".page").addClass('static').css({
                    transform: 'translate3d(0px,' + scrollPosition + 'px,0px)'
                })
            }else {
                $(".page").removeClass('static').css({
                    transform: 'translate3d(0px,0px,0px)'
                })
            }
            scrolling = false;
        }
        requestID = requestAnimationFrame(animateOnScroll)
    }
    animateOnScroll();
})

//upload_image
$(document).on('ready', function() {
    $("#input-25").fileinput({
        overwriteInitial: true,
        initialCaption: "The Moon and the Earth"
    });
});
function validateForm(){
  url = 'api/photo?token=';
  url += sessionStorage.tokenData;
  $.ajax({
                cache: true,
                type: "POST",
                url:url,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,
                data:new FormData($('#form')[0]),// 你的formid
                error: function(request) {
                    alert("Connection error");
                },
                success: function(data) {
                  if(data.error==null){
                    var modal = UIkit.modal("#upload-img");
                    modal.hide();
                  }else {
                    alert(data.error)
                  }
                }
            });
}
