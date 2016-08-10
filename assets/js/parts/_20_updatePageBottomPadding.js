// fix page bottom padding for scrollspy
devconsole.log("updatePageBottom loaded");

var updatePageBottomPadding = function(){
  devconsole.log("updatePageBottomPadding called");
  var windowHeight = $(window).innerHeight(),
      lastSectionHeight = $('.fw-group:last-child').find('section:last-child').height();
  $('.fw-content > .fw-inner').css('padding-bottom', windowHeight - lastSectionHeight);
}

$(function(){

  // better binding for window resize
  // http://stackoverflow.com/questions/7494378/jquery-ui-resizable-fire-window-resize-event
  // does not fire caused by jquery ui resize events
  $(window).bind('resize', function(event) {
    if (this == event.target) {
      updatePageBottomPadding();
    }
  });
  updatePageBottomPadding();

});


