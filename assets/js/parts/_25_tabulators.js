// tabulations scripting
devconsole.log("tabulations loaded");

var refreshTabulators = function(tabulator){
    devconsole.log("refreshTabulators called");
  // console.log(tabulator);

  // check if tabulation has active tabs
  if( !($(tabulator).children(".active").length) ){
    // tabulation has no active tabs
    // set first tab as active
    $(tabulator).children().first().addClass("active");
  }

  // get number(index) of tab with active class
  var tabIndex = $(tabulator).children(".active").index();

  // find nearest tabs container after tabulators
  var tabContainer = $(tabulator).next(".fw-tabs");;

  // select tab content, which should be active
  var activateTab = $(tabContainer).children().eq( tabIndex );

  // add active class and remove hidden class to activated tab
  $(activateTab).addClass("active").removeClass("hidden");

  // hide all other tabs
  $(tabContainer).children().not(activateTab).each(function(){
    $(this).addClass("hidden").removeClass("active");
  });

  if(resizableIframesLoaded){
    $(tabContainer).find(".fw-resizable").each(function(){
      updateResizable($(this));
    });
  }

}

$(function(){

  // render all tabulations after page is loaded
  $(".fw-tabulators").each(function(){
    refreshTabulators( $(this) );
  });

  // switch tabulations on click
  $(".fw-tabulators > *").click(function(){
    if( !($(this).hasClass("active")) ){
      // when non-active tabs is clicked

      // find this tabulator container
      var tabulatorsContainer = $(this).closest(".fw-tabulators");

      // add active class to clicked tab
      $(this).addClass("active");

      // remove active class from all other tabs, except clicked one
      $(tabulatorsContainer).children().not( $(this )).removeClass("active");

      // refresh contents below clicked tab
      refreshTabulators( tabulatorsContainer );

    }
  });

});


