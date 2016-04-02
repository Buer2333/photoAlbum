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

//uikit灯箱
