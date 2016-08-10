
// sticky elements
devconsole.log("stickyElements loaded");

$(function(){

  // sticky kit causes stick and bottom event on every resize of jquery ui elements

  // $(".fw-sidebar > .fw-inner").stick_in_parent({
    // offset_top: $(".fw-sidebar > .fw-inner").offset().top
  // });




  // $(".fw-sticky, h3").stick_in_parent({
  //   recalc_every: 100
  // })
  // .on("sticky_kit:stick", function(e){
  //   devconsole.log("sticky stick");

  // })
  // .on("sticky_kit:unstick", function(e){
  //   devconsole.log("sticky unstick");
  // })
  // .on("sticky_kit:bottom", function(e){
  //   devconsole.log("sticky bottom");
  // })
  // .on("sticky_kit:unbottom", function(e){
  //   devconsole.log("sticky unbottom");
  // });




  // recalc sticky after the sidebar is generated
  setTimeout(function(){
    $(".fw-sidebar > .fw-inner").trigger("sticky_kit:recalc");
  }, 1500);
});


