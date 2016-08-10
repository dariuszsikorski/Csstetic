$.fn.pointRectDistance = function(pointX, pointY) {
  var rectX = $(this).offset().left;
  var rectY = $(this).offset().top;
  var rectWidth = $(this).outerWidth();
  var rectHeight = $(this).outerHeight();
  var dx = Math.max(Math.abs(pointX - rectX - rectWidth / 2) - rectWidth / 2, 0);
  var dy = Math.max(Math.abs(pointY - rectY - rectHeight / 2) - rectHeight / 2, 0);
  return Math.sqrt(dx * dx + dy * dy);
};

function refreshDistances(){
  var browserCenterX = $(window).innerWidth()/1.75 + $(window).scrollLeft();
  var browserCenterY = $(window).innerHeight()/1.75 + $(window).scrollTop();
  // console.log(distance);
  $("section").each(function(){
    var distance = $(this).pointRectDistance(browserCenterX, browserCenterY);
    // var calcOpacity = (100 - distance * 0.25) / 100;
    // $(this).text(distance);
    // $(this).css("opacity", calcOpacity);
    if(distance <= 0){
      // add class reveal
      if( !($(this).hasClass("reveal")) ){
        $(this).addClass("reveal");
      }

    } else {
      // remove class reveal
      if( $(this).hasClass("reveal") ){
        // $(this).removeClass("reveal");
      }
    }
  });
}



setInterval(function(){
  refreshDistances();
}, 100);
