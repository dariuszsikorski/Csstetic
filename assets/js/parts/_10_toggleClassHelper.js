// toggleclass helper
devconsole.log("toggleClassHelper loaded");

$("[toggleClass]").click(function(){
  devconsole.log("toggleClass called");
  var target = $(this).attr("toggleClassSelector");
  var className = $(this).attr("toggleClass");
  $(target).toggleClass(className);
});



