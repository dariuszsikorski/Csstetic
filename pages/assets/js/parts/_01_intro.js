// $(function(){
//   alert("gi");
// });


$(function(){
  $(".mainbar .getit-link").on("click", function(){

    var winHeight = $(window).outerHeight();
    // alert(winHeight);
    $("html, body").stop().animate({
        scrollTop: $("section.getit").offset().top - (winHeight/2)
    }, 1500);
  });
  $(".mainbar .intro-link").on("click", function(){
    $("html, body").stop().animate({
        scrollTop: $("section.description").offset().top
    }, 1500);
  });


  // Return today's date and time
  var currentTime = new Date();

  // returns the year (four digits)
  var year = currentTime.getFullYear();

  // apply date to footer
  $(".current-year").text(year);


});
