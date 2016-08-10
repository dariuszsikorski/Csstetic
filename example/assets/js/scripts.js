$(function(){
  function showSlide(direction){

    // find last active slide
    var lastActive = $(".slides").find("[data-slide].active").last();

    console.log( $(lastActive).attr("data-slide") );


    if(direction == "previous"){
      // remove active from latest slide
      if( $(lastActive).attr("data-slide") != 1 ){
        $(lastActive).removeClass("active");
      }
    }
    if(direction == "next"){
      // add active to next slide
      $(lastActive).next("[data-slide]").addClass("active");
    }



  }
  $(".navi-button.previous").on("click", function(){
    showSlide("previous");
  });
  $(".navi-button.next").on("click", function(){
    showSlide("next");
  });
});