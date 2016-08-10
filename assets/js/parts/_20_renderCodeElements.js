// detect type of a block and render code containers and code tooltips
devconsole.log("renderCodeElements loaded");

var hideAllSpoileredCodes = function(){
  devconsole.log("hideAllSpoileredCodes called");
  $(".fw-spoileredCode + .fw-source").remove();
}

// function for scrollbar click detection
var clickedOnScrollbar = function(mouseX){
  devconsole.log("clickedOnScrollbar called");
  if( $(window).outerWidth() <= mouseX ){
    return true;
  }
}




// clickoff
$(document).mousedown(function(e){
  if(
    !( clickedOnScrollbar(e.clientX) ) &&
    !($(e.target).parents(".fw-source, .tooltipster-base, .fw-switch").length) &&
    !($(e.target).hasClass("fw-copy")) &&
    !($(e.target).hasClass("ui-resizable-handle"))
    ){
    hideAllSpoileredCodes();
  }
});



var reRenderCodeElement = function(element){
  devconsole.log("reRenderCodeElement called");
  if( $(element).hasClass("c-elements") ){
    // console.log("case: B - elements");
    if( $(element).hasClass("c-visible") ){
      // B2) if copy is: container with copy elements, always visible code
      // console.log(index + ") case: B2");
      // create always visible code, for each element separately
      // createDestroySourceBlock( $(element) );
    } else {
      // B1) if copy is: container with copy elements, using spoiler
      // console.log(index + ") case: B1");
      // create code button for each element, opening spoiler with code of clicked element

      if( !($(element).hasClass("fw-spoileredCode") ) ){
        $(element).addClass("fw-spoileredCode");

      }

      $(element).children().each(function(index, element){
        createDestroySourceBlock( $(element), "destroy" );
        addTooltip(element, "top", function(){
          hideAllSpoileredCodes();
          createDestroySourceBlock( $(element) );
        });
      });

    }
  } else if( $(element).children("iframe").length == 1 ){
    // console.log("case: C - iframe");
    if( $(element).hasClass("c-visible") ){
      // C2) if copy is: iframe with copy, always visible code
      // console.log(index + ") case: C2");
      // create always visible spoiler below element, with iframe code
      createDestroySourceBlock( $(element) );

    } else {
      // C1) if copy is: iframe with copy, using spoiler
      // console.log(index + ") case: C1");
      // create code button, opening spoiler with code of entire iframe

        if( !($(element).hasClass("fw-spoileredCode") ) ){
          $(element).addClass("fw-spoileredCode");
        }


      createDestroySourceBlock( $(element), "destroy" );

      addTooltip(element, "top-right", function(){
        hideAllSpoileredCodes();
        createDestroySourceBlock( $(element) );
      });

    }
  // } else if( $(element).hasClass("fw-code") ){
    // console.log("case: D - code");
    // D) if copy is: a code block, always visible code
    // console.log(index + ") case: D");
    // convert source code element to copy-able source element

  } else {
    if( !($(element).hasClass('fw-code')) ) {
      // console.log("case: A - container");
      if( $(element).hasClass("c-visible") ){
        // A2) if copy is: container with copy, always visible code
        // console.log(index + ") case: A2");
        // create source code below element, always visible
        createDestroySourceBlock( $(element) );
      } else {
        // A1) if copy is: container with copy, using spoiler
        // console.log(index + ") case: A1");
        // create code button in upper right corner, opening spoiler with entire code
        if( !($(element).hasClass("fw-spoileredCode") ) ){
          $(element).addClass("fw-spoileredCode");
        }

        createDestroySourceBlock( $(element), "destroy" );

        addTooltip(element, "top-right", function(){
          hideAllSpoileredCodes();
          createDestroySourceBlock( $(element) );
        });
      }
    }
  }


}



var reRenderAllCodeElements = function(){
  devconsole.log("reRenderAllCodeElements called");
  $(".fw-copy").each(function(index, element){
    // $(element).css("outline", "solid 3px blue");
    reRenderCodeElement(element);
  });

}

reRenderAllCodeElements();
