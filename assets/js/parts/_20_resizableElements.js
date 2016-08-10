// fix jquery ui resizable iframes
devconsole.log("resizableElements loaded");

$.ui.plugin.add("resizable", "iframeFix", {
  start: function(event, ui) {
    var o = $(this).data('resizable').options;
    $(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
      $('<div class="fw-resizable-iframeFix" style="background: #fff;"></div>').css({
        width: this.offsetWidth + "px",
        height: this.offsetHeight + "px",
        position: "absolute",
        opacity: "0.001",
        zIndex: 1000
      }).css($(this).offset()).appendTo("body");
    });
  },
  stop: function(event, ui) {
    $("div.fw-resizable-iframeFix").each(function() {
      this.parentNode.removeChild(this);
    }); //Remove frame helpers
  }
});




//----------------------------------------------------------------------
// create/recalc resizable element

var resizableStartWidth = 1060;
// var resizableHandleWidth = 10;

var updateResizable = function(resizableElement){
  devconsole.log("updateResizable called");
  // this changes resizableElement into jqueryUi resizable

  // define parent width for setting max-sizes
  var extraBottomGap = 0; // px (should be 20)

  // $(resizableElement).css("outline", "dotted 2px rgba(0,0,0,0.15)");
  // setTimeout(function(){
  //   $(resizableElement).css("outline", "none");
  // }, 2500);

  var paddingLeft = parseInt( $(resizableElement).parent().css('padding-left') );
  var paddingRight = parseInt( $(resizableElement).parent().css('padding-left') );
  var parentWidth = $(resizableElement).parent().outerWidth() - paddingLeft - paddingRight;


  // limit resizable not to be bigger than parent container
  $(resizableElement).css("max-width", parentWidth);

  // if resizable element has no inline width, set it to parent width
  if ( !($(resizableElement).inlineStyle("width")) ) {
    // console.log("has not been resized yet");
    if( parseInt($(resizableElement).width()) > 1030 ){
      $(resizableElement).css({
        "width": resizableStartWidth
        // "left": (resizableHandleWidth*(-0.5)) + "px"
      });
    }
    // $(resizableElement).css("width", parentWidth);
  } else {
    // console.log("resizable has already been resized");
  }

  // if( parseInt($(resizableElement).css("width")) > parseInt(parentWidth) ){
  //   $(resizableElement).css("width", parentWidth);
  // }

  // for iframe
  // set iframe min-height same as it's inner content height
  var iframe = $(resizableElement).children("iframe");
  if ( iframe.length ){
    // resizable has iframe
    // console.log("resizable has iframe");

    var iframe = $(iframe)[0];
    // $(resizableElement).css("margin-bottom", extraBottomGap*(-1));

    // set iframe height equal to it's content
    var iframeContentHeight = 100;
    // console.log( iframe.offsetHeight );
    if(iframe.offsetHeight){

      iframeContentHeight = iframe.contentWindow.document.body.offsetHeight + extraBottomGap + "px";
      iframe.style.height = iframeContentHeight;

    }

    // get frame width and height for setting resizable proportions
    var frameWidth = $(iframe).innerWidth() + 50;
    var frameHeight = $(iframe).innerHeight();

    // set resizable height equal to iframe height
    $(resizableElement).css("height", frameHeight);
    function getMinHeight(){
      if(frameWidth <= 100){
        return frameHeight;
      }
    }
    if (frameWidth <= 100) return; // do nothing if frameWidth is smaller

    $(resizableElement).resizable({
      aspectRatio: frameWidth/frameHeight,
      minHeight: getMinHeight(),
      maxWidth: parentWidth,
      handles: "e",
      resize: function(event, ui){
        ui.size.width += ui.size.width - ui.originalSize.width; // double resize speed
        updateResizable(resizableElement);
      },
      stop: function(){
        updatePageBottomPadding();
        updateResizable(resizableElement);
      }
    });
  }

  else {
    // resizable has no iframe and no .fw-resizable-content
    // console.log("resizable has no iframe and no .fw-resizable-content");
    $(resizableElement).resizable({
      maxWidth: parentWidth,
      handles: "e",
      resize: function(event, ui){
        updateResizable(resizableElement);
        ui.size.width += ui.size.width - ui.originalSize.width; // double resize speed
      },
      stop: function(){
        updatePageBottomPadding();
      }
    });
  }
}

var resizableIframesLoaded = false;

$(function(){

  //----------------------------------------------------------------------
  // re-render all resizables on website
  var renderResizables = function(){
    devconsole.log("renderResizables called");
    $(".fw-resizable").each(function(index, resizableElement){
      $(resizableElement).show();
      updateResizable(resizableElement);
    });
  }


  //----------------------------------------------------------------------
  // trigger event after all resizable iframes are loaded
  // wait for all resizable iframes to be loaded before applying resizable

  var waitForResizableIframes = setInterval(function(){
    var numberOfIframes = $(".fw-resizable > iframe").length;
    var numberOfLoadedIframes = $(".fw-resizable > iframe.loaded").length;
    // devconsole.log("loaded: " + numberOfLoadedIframes + " of " + numberOfIframes + " iframes");

    if( numberOfLoadedIframes == numberOfIframes  ){
      // when all resizable iframes are loaded
      onResizableIframesLoaded();
      resizableIframesLoaded = true;
      // devconsole.log("iframes loaded");
      clearInterval(waitForResizableIframes);
    }
  }, 300);


  $(".fw-resizable > iframe").each(function() {
    if( $(this).hasClass("loaded") ){
      // console.log("already loaded");
    } else {
      // console.log("not loaded yet");
      // trigger reload on iframes, because some load before JS code is executed,
      // and they dont trigger .load() event
      this.contentWindow.location.reload(true);
    }
    $(this).load(function() {
      $(this).addClass("loaded");
    });
  });



  //----------------------------------------------------------------------
  // render resizables after page and iframes are loaded

  var loadingSpinnerRequired = function(){
    devconsole.log("loadingSpinner called");
    if ( $(".fw-resizable > iframe").length > 15 ){
      // spinner required
      return true;
    } else {
      // spinner not required
      return false;
    }
  }

  var onResizableIframesLoaded = function(){
    devconsole.log("onResizableIframesLoaded called");
    // console.log("all resizable iframes loaded");
    // initial render resizables
    renderResizables();

    // re-render resizables to fix some height calculation issues
    // renderResizables();

    // re-render resizables after every browser resize
    $(window).bind('resize', function(event) {
      if (this == event.target) {
        renderResizables();
      }
    });

    if( loadingSpinnerRequired() ){ mySpinner.hide(); };
  }

  // all of the code here trigger before iframes are loaded, or only a few of them.
  var mySpinner;
  if( loadingSpinnerRequired() ){ mySpinner = loadingSpinner("show"); };

  // this trigger when all iframes are loaded too
  $(window).load(function(){
    // just in case. render resizables after entire website is loaded
    // sometimes onResizableIframesLoaded does not run, when ctrl+r is clicked
    renderResizables();
    // if( loadingSpinnerRequired() ){ mySpinner.hide(); };
  });




});



