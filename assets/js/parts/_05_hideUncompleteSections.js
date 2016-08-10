// hide sections without .ready class
devconsole.log("hideUncompleteSections loaded");

$(function(){
  $(".fw-group > section").each(function(index, element){
    // console.log(a);
    if( $(element).is(".js-hidden") ){
      $(element).remove();
    }
  });
});