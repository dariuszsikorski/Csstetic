
/* ========================================================================
 * devconsole
 * ======================================================================== */


// devconsole

var devCounter = 0;
var devMode = false;
var devconsole = {};
devconsole.log = function(message){

  if(devMode && message){
    console.log(devCounter + ": " + message);
    devCounter++;
  }
}

devconsole.log("devConsole loaded");





/* ========================================================================
 * hideUncompleteSections
 * ======================================================================== */


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

/* ========================================================================
 * clickoffPlugin
 * ======================================================================== */


// clickoff plugin
//http://jsfiddle.net/KyleMit/tHCUB/
devconsole.log("clickoffPlugin loaded");

$.fn.clickOff = function(callback, selfDestroy) {
    devconsole.log("clickoffPlugin called");

    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;

    parent.click(function() {
        clicked = true;
    });

    $(document).click(function(event) {
        if (!clicked) {
            callback(parent, event);
        }
        if (destroy) {
            //parent.clickOff = function() {};
            //parent.off("click");
            //$(document).off("click");
            //parent.off("clickOff");
        };
        clicked = false;
    });
};





/* ========================================================================
 * detectIeVersion
 * ======================================================================== */


// IE detection
devconsole.log("detectIE loaded");

var Ie8 = (document.documentMode === 8),
    Ie9 = (document.documentMode === 9),
    Ie10 = (document.documentMode === 10),
    Ie11 = (document.documentMode === 11);





/* ========================================================================
 * escapeHtmlHelpers
 * ======================================================================== */


// http://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery
// escape html code into string
devconsole.log("escapeHtmlHelpers loaded");


function escapeHtml(string) {
  devconsole.log("escapeHtml called");
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};




// --------------------------------------------------------------------------
// get re-formatted html code of any element
// warning: it's not escaped code, it's just re-formatted html

function getTrimmedHtml(element){
  devconsole.log("getTrimmedHtml called");
  if(element){

    var html = $(element).html();

    // remove all new lines at beginning and ending of element
    html = html.replace(/^\n+|\n+$/g, '');

    // find shortest html element indent
    var shortestIndent;
    html = html.split('\n');
    for(var i = 0; i < html.length; i++){
      // for each line
      var line = html[i];
      // ignore comment lines in searching
      if( $.trim(line).substring(0, 4) != "<!--" ){
        // count number of spaces before code for current line
        var spaces = line.search(/\S/);
        if( (shortestIndent > spaces || shortestIndent == undefined) && spaces >= 0 ){
          shortestIndent = spaces;
        }
      }
    }

    // remove spaces before each line (align to shortest indent)
    for(var i = 0; i < html.length; i++){
      // for each line
      var line = html[i];
      if( $.trim(line).substring(0, 4) != "<!--" ){
        // if line is not a comment, remove spaces
        html[i] = line.substring(shortestIndent, line.length);
      } else {
        // if line is a comment:
        // remove it's spaces
        html[i] = $.trim(line);
        // align to shortest line, and add 2 spaces
        for (space = 0; space < 2; space++) {
          html[i] = " " + html[i];
        }
      }
    }

    // join all lines
    html = html.join("\n");
    return html;

  } else {
    devconsole.log("element must be defined before you use getTrimmedHtml");
  }
};




/* ========================================================================
 * getInlineStyle
 * ======================================================================== */


// plugin - get inline style of element
devconsole.log("getInlineStyle loaded");

(function ($) {
  $.fn.inlineStyle = function (prop) {
    devconsole.log("inlineStyle called");
    return this.prop("style")[$.camelCase(prop)];
  };
}(jQuery));





/* ========================================================================
 * loadingSpinner
 * ======================================================================== */


var loadingSpinner = function(command, element){
  devconsole.log("loadSpinner called");
  if( command == "show" ){
    var opts = {
      lines: 13, // The number of lines to draw
      length: 11, // The length of each line
      width: 5, // The line thickness
      radius: 17, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      color: '#FFF', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    var target = document.createElement("div");
    document.body.appendChild(target);
    var spinner = new Spinner(opts).spin(target);

    var overlay = iosOverlay({
      text: "Loading",
      duration: 9999999,
      spinner: spinner
    });
    return overlay;
  } else if( command == "hide" ) {
    if(element){
      element.hide();
    }
  }
}

// creating spinner
// var mySpinner = loadingSpinner("show");

// setTimeout(function(){
//   // first method of hiding
//   mySpinner.hide();
//   // second method of hiding
//   loadingSpinner("hide", mySpinner);
// }, 1500);


/* ========================================================================
 * measureScrollbarWidth
 * ======================================================================== */


// measure scrollbar width
// http://stackoverflow.com/questions/10045423/determine-whether-user-clicking-scrollbar-or-content-onclick-for-native-scroll
devconsole.log("measureScrollbarWidth loaded");

var measureScrollBarWidth = function() {
    devconsole.log("measureScrollbarWidth called");
    var scrollBarMeasure = $('<div />');
    $('body').append(scrollBarMeasure);
    scrollBarMeasure.width(50).height(50)
        .css({
            overflow: 'scroll',
            visibility: 'hidden',
            position: 'absolute'
        });

    var scrollBarMeasureContent = $('<div />').height(1);
    scrollBarMeasure.append(scrollBarMeasureContent);

    var insideWidth = scrollBarMeasureContent.width();
    var outsideWitdh = scrollBarMeasure.width();
    scrollBarMeasure.remove();

    return outsideWitdh - insideWidth;
};

/* ========================================================================
 * notyConfiguration
 * ======================================================================== */


// noty configuration
devconsole.log("notyConfig loaded");

$.noty.defaults = {
    layout: 'topRight',
    theme: 'relax', // defaultTheme or 'relax'
    type: 'success',
    text: '', // can be html or string
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
        close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
        easing: 'swing',
        speed: 500 // opening & closing animation speed
    },
    timeout: 2500, // delay for closing event. Set false for sticky notifications
    force: false, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 5, // you can set max visible notification for dismissQueue true option,
    killer: false, // for close all notifications before show
    closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
    callback: {
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {},
        onCloseClick: function() {},
    },
    buttons: false // an array of buttons
};





/* ========================================================================
 * toggleClassHelper
 * ======================================================================== */


// toggleclass helper
devconsole.log("toggleClassHelper loaded");

$("[toggleClass]").click(function(){
  devconsole.log("toggleClass called");
  var target = $(this).attr("toggleClassSelector");
  var className = $(this).attr("toggleClass");
  $(target).toggleClass(className);
});





/* ========================================================================
 * addTooltipToElement
 * ======================================================================== */


// upgraded consctructor for tooltipster
// with onClick callback and "code" button inside
devconsole.log("addTooltipCode loaded");

var addTooltip = function(target, position, onClick){
  devconsole.log("addToooltip called");
  if( position == undefined ){
    position: "top"
  }
  $(target).each(function(index, element){
    if( !($(element).hasClass("tooltipstered")) ){
      $(element).tooltipster({
        content: $('<span class="fw-code-button">code</span>'),
        interactive: true,
        onlyOne: true,
        delay: 0,
        interactiveTolerance: 750,
        position: position,
        hideOnClick: true,
        offsetY: -20,
        animation: "grow",
        functionReady: function(origin, tooltip) {
          tooltip.on("click", function() {
            if(onClick != undefined){
              onClick();
            }
          });
        }
      });
    }
  });
};





/* ========================================================================
 * createDestroySourceBlock
 * ======================================================================== */


// detect type of a block and view source code container below
devconsole.log("createDestroySourceBlock loaded");

function getCustomCode(copyContainer, blockNumber, codeLanguage){
  devconsole.log("getCustomCode called");
  if((copyContainer && blockNumber && codeLanguage)){
    // find custom source container
    var sourceContainer = "";
    if( $(copyContainer).next(".fw-custom-source").length ){
      // console.log("custom source is directly after copy container");
      sourceContainer = $(copyContainer).next(".fw-custom-source");
    } else if( $(copyContainer).next(".fw-source").next(".fw-custom-source").length ){
      // console.log("custom source is after generated source container");
      sourceContainer = $(copyContainer).next(".fw-source").next(".fw-custom-source");
    } else {
      // console.log("this block has no custom source");
      sourceContainer = null;
    }

    if( sourceContainer ){
      // console.log("this block HAS custom source");
      var sourceCode = "";
      // console.log("looking for: " + codeLanguage);
      if( blockNumber == "all" ){
        // console.log("it's string all");
        sourceContainer.children(".fw-" + codeLanguage + "-code").each(function(){
          sourceCode = sourceCode + getTrimmedHtml( $(this) ) + "\n";
        });
      } else if( typeof(blockNumber) == "number" ) {
        // console.log("its number: " + blockNumber);
        sourceCode = sourceContainer.children(".fw-" + codeLanguage + "-code")[blockNumber-1];
        // sourceCode = sourceContainer.children(".fw-" + codeLanguage + "-code:nth-child(" + blockNumber + ")");
        // sourceCode = "a {c: a;}";
      }
      return sourceCode;
    } else {
      // no custom source container for this element
      return null;
    }

    // return sourceCode;
  } else {
    devconsole.log("copyContainer & blockNumber & codeLanguage must be defined in getCustomCode");
  }
}





function createDestroySourceBlock(sourceElement, destroy){
  devconsole.log("createDestroySourceBlock called");
  // noty({text: $(sourceElement).attr("class") });

  // detect type of block
  // if(  ){
  var hasTooltipsteredClass = $(sourceElement).hasClass("tooltipstered");
  if( hasTooltipsteredClass ){
    $(sourceElement).removeClass("tooltipstered")
  }

  if( $(sourceElement).hasClass("fw-code") ){
    // noty({text: "codeblock to copy" });
    // code block
  } else {
    var copyContainer = $(sourceElement),
        htmlCode,
        cssCode,
        scssCode,
        jsCode;

    if ( $(sourceElement).children("iframe").length == 1 ){
      // iframe -----------------------------------
      htmlCode = getCustomCode(copyContainer, "all", "html");
      if(htmlCode){
        // console.log("htmlCode for iframe was defined in customContainer.");
      } else {
        // console.log("htmlCode for iframe was not defined, taking it's inner contents.");
        htmlCode = $(sourceElement).find("iframe").contents().find("body").html();
      }
      cssCode = getCustomCode(copyContainer, "all", "css");
      scssCode = getCustomCode(copyContainer, "all", "scss");
      jsCode = getCustomCode(copyContainer, "all", "js");


    } else if( $(sourceElement).parent().hasClass("fw-copy") ){
      // single element -----------------------------------
      // noty({text: "single element to copy" });
      var index = $(sourceElement).index()+1;
      copyContainer = $(sourceElement).closest(".fw-copy");

      htmlCode = getCustomCode(copyContainer, index, "html" );
      if(htmlCode){
        // console.log("htmlCode for single element was defined in customContainer.");
      } else {
        // console.log("htmlCode for single element was not defined, taking the element's code.");
        htmlCode = $(sourceElement)[0].outerHTML;
      }
      cssCode = getCustomCode(copyContainer, index, "css" );
      scssCode = getCustomCode(copyContainer, index, "scss" );
      jsCode = getCustomCode(copyContainer, index, "js" );

    } else {
      // container -----------------------------------
      // noty({text: "container to copy" });
      htmlCode = getCustomCode(copyContainer, "all", "html");
      if(htmlCode){
        // console.log("htmlCode for container was defined in customContainer.");
      } else {
        // console.log("htmlCode for container was not defined, taking the element's code.");
        htmlCode = $(sourceElement);
      }
      cssCode = getCustomCode(copyContainer, "all", "css");
      scssCode = getCustomCode(copyContainer, "all", "scss");
      jsCode = getCustomCode(copyContainer, "all", "js");

    }
    // detect if sourceblock has to be created or destroyed
    if( destroy == undefined ){
      // create
      // create source container if doesn't exist
      if( !($(copyContainer).next().hasClass("fw-source")) ){
        // noty({text: "next element is not a source container i need to create one" });
        $(copyContainer).after('<div class="fw-source"></div>');
      }
      // create source blocks
      if(htmlCode){
        // console.log("hasHtmlCode");
        $(copyContainer).next(".fw-source").append('<div class="fw-source-html">html goes here</div>');
        showSourceCode( htmlCode , $(copyContainer).next(".fw-source").children(".fw-source-html") );
      } else {
        // console.log("html code was not defined");
      }
      if(cssCode){
        // console.log("hasCssCode");
        $(copyContainer).next(".fw-source").append('<div class="fw-source-css">css goes here</div>');
        showSourceCode( cssCode , $(copyContainer).next(".fw-source").children(".fw-source-css") );
      } else {
        // console.log("css code was not defined");
      }
      if(scssCode){
        // console.log("hasScssCode");
        $(copyContainer).next(".fw-source").append('<div class="fw-source-scss">scss goes here</div>');
        showSourceCode( scssCode , $(copyContainer).next(".fw-source").children(".fw-source-scss") );
      } else {
        // console.log("scss code was not defined");
      }
      if(jsCode){
        // console.log("hasJsCode");
        $(copyContainer).next(".fw-source").append('<div class="fw-source-js">js goes here</div>');
        showSourceCode( jsCode , $(copyContainer).next(".fw-source").children(".fw-source-js") );
      } else {
        // console.log("js code was not defined");
      }

      $(copyContainer).next(".fw-source").hide().fadeIn();
    } else {
      // destroy fw-source
      // destroy source container if it exist
      if( $(copyContainer).next().hasClass("fw-source") ){
        $(copyContainer).next(".fw-source").remove();
      }

    }
  }

  // restore tooltipstered
  if( hasTooltipsteredClass ){
    $(sourceElement).addClass("tooltipstered")
  }
};





/* ========================================================================
 * applyHighlightJs
 * ======================================================================== */


// render highlight js and add header
devconsole.log("applyHighlightJs loaded");

var highlightWithHeader = function(block){
  devconsole.log("highlightWithHeader called");


  // var checkExist = setInterval(function() {
  //  if ( !(typeof hljs == "undefined") ) {
  //   console.log("Exists!");
  //   clearInterval(checkExist);
  //  } else {
  //   console.log("Not Exist");
  //  }
  // }, 1000); // check every 100ms

  // apply highlight.js
  if( !(Ie8) ){

    hljs.highlightBlock(block);

    // after conversion, replace BR's in output hljs code with \n character, it's required for Online HTML Escape tool
    var sourceWithoutBr = $(block).html().replace(/<br\s*\/?>/mg,"\n").replace(/<\s*\/?br>/ig, "\r\n");
    $(block).html( sourceWithoutBr );

  }

  // detect code language
  var languageIsDetected = true;
  if( $(block).hasClass("less") || $(block).hasClass("scss") ){
    title = "SCSS";
    $(block).addClass("scss");
  } else if( $(block).hasClass("css") ){
    title = "CSS";
    $(block).addClass("css");
  } else if( $(block).hasClass("twig") || $(block).hasClass("html") || $(block).hasClass("xml") || $(block).hasClass("cs") || $(block).hasClass("stylus") ){
    title = "HTML";
    $(block).addClass("html");
  }  else if( $(block).hasClass("javascript")){
    title = "SCRIPT";
    $(block).addClass("javascript");
  } else {
    languageIsDetected = false;
  }

  // create header
  var customHeader = $(block).closest('.fw-code').attr('data-header');
  if (typeof customHeader !== typeof undefined && customHeader !== false) {
    // header is defined
    title = customHeader;
    $(block).closest("pre").before("<p class=\"fw-code-title\">" + title + "</p>");
  } else {
    if(languageIsDetected){
      // create title element
      $(block).closest("pre").before("<p class=\"fw-code-title " + title.toLowerCase() + "\">" + title + "</p>");
    }
  }

  addCopyButton(block);

}

// --------------------------------------------------------------------------
// add copy button
var addCopyButton = function(block){
  // console.log("addcopybutton called");
  devconsole.log("addCopyButton called");
  // create html for copy button
  var buttonHtml = '<span class="fw-code-copy">\
                      <span class="fw-code-copy-mask" title="Copy to clipboard">\
                        <span class="fw-code-copy-button first">copy</span>\
                        <span class="fw-code-copy-button second">copy</span>\
                        <span class="fw-code-copy-button third">copy</span>\
                        <span class="fw-code-loading-mask">\
                          <span class="fw-code-copy-button fourth">copy</span>\
                        </span>\
                        <span class="fw-code-copy-button fifth"> done</span>\
                      </span>\
                    </span>';

  var createdPre = $(block).closest("pre");

  $(createdPre).before(buttonHtml);
  // var buttonSelector = $(block).prev(".fw-code-copy").children(".fw-code-copy-button");

  $(createdPre).prev(".fw-code-copy").children(".fw-code-copy-mask").tooltipster({
    theme: 'tooltipster-light',
    // interactive: true,
    delay: 100,
    animation: "grow"
  });

  if(makeSureWindowIsLoaded){

    var preBottom = $(createdPre).offset().top + $(createdPre).outerHeight();
    var preTop = $(createdPre).offset().top;
    var windowHeight = $(window).outerHeight();
    var scrollTop = $(window).scrollTop();

    // console.log(scrollTop);


    if( preTop > ( scrollTop + windowHeight - 250 ) ){
      $(createdPre).addClass("fw-highlighted");
      setTimeout(function(){
        $(createdPre).removeClass("fw-highlighted");
      }, 1500);
    }
    if( preTop > ( scrollTop + windowHeight ) ){
      // generated code was Below user screen
      $('html, body').animate({scrollTop: preTop - windowHeight + 150 }, 500);
    }


  }

}

var makeSureWindowIsLoaded = false;
$(window).load(function(){
  setTimeout(function(){
    makeSureWindowIsLoaded = true;
  }, 3000);
});


if( !(Ie8) ){

  new Clipboard(".fw-code-copy-mask", {
    text: function(trigger) {
      devconsole.log("Clipboard called");
      var source = $(trigger).closest(".fw-code-copy").next("pre").text();

        // prepare code with newline fix for Windows users
        // http://www.kellyjandrews.com/zc/guides/limitations/os-specific/
        source = source.replace(/\n/g, '\r\n');

      if( !($(trigger).hasClass("copying done")) ){
        $(".fw-code-copy-mask").tooltipster("hide");
        $(trigger).addClass("copying");
        // $(".fw-code-copy").not( $(trigger).closest(".fw-code-copy") ).fadeOut();
        setTimeout(function(){
          $(trigger).addClass("done");
          // $(trigger).fadeOut(4000);
          // noty({text: "Code is in your clipboard now." });
        }, 700);
        setTimeout(function(){
          $(trigger).removeClass("copying done");
          $(trigger).hide().stop().fadeIn();
          // $(".fw-code-copy").fadeIn();
        }, 4000);
      }

      return source;
    }
  });

}



// --------------------------------------------------------------------------
// detect if string (source) is html
// http://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not
function isHTML(str) {
  var a = document.createElement('div');
  a.innerHTML = str;
  for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
  }
  return false;
}


// show code of source element in target container element
var showSourceCode = function(source, target){
  devconsole.log("showSourceCode called");
  var sourceSelector = source;
  var predefinedLanguage = "";

  if ( !(typeof source === 'string' || source instanceof String) ){

    // detect predefined langiages in .fw-code element, like .fw-code.css
    if ( $(source).hasClass("css") ){ predefinedLanguage = "css"; }
    if ( $(source).hasClass("scss") ){ predefinedLanguage = "scss"; }
    if ( $(source).hasClass("js") ){ predefinedLanguage = "javascript"; }
    if ( $(source).hasClass("html") ){ predefinedLanguage = "html"; }

    // convert source element to string
    source = getTrimmedHtml(source);

    // remove ui-resizable from source
    source = source.replace(/\<div class="ui-resizable.*div\>/, '');

    if( isHTML(source) ){
      source = html_beautify(source, {
        "indent_size": 2
      });
    }

  }



  // remove whitespaces from start and end of string
  source = $.trim(source);

  // remove empty class="" attributes
  source = source.replace(' class=""', "");

  // if source is unescaped html code
  if( source.charAt(0) == "<" && source.substr(source.length - 1) == ">" ){
    source = escapeHtml(source);
  }

  // insert source code into target element
  $(target).html('<pre><code class=\"' + predefinedLanguage + '\">' + source + '</pre></code>');

  // render hljs on target element
  $(target).children("pre").children("code").each(function(i, block) {
    highlightWithHeader(block);
  });
}

$(".fw-code").each(function(){
  showSourceCode($(this), $(this));
});

/* ========================================================================
 * generateSidebar
 * ======================================================================== */


// generate sidebar menu with index of contents
devconsole.log("generateSidebar loaded");

$(function(){

  var generateNavigation = function() {
    devconsole.log("generateNavigation called");
    var navigationHtml = "";
    // first level
    navigationHtml += '<div id="navbar"><ul class="nav first">';
    $('.fw-group').each(function(groupIndex) {
      var currentGroup = $(this);
      var currentGroupHeader = $(currentGroup).attr('data-name');

      if( $(currentGroup).children("section").length > 0 ){

        var generatedGroupId = (currentGroupHeader.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')).toLowerCase();
        $(currentGroup).attr('id', generatedGroupId);
        navigationHtml += '<li>\n<a href="#' + generatedGroupId + '">' + currentGroupHeader + "</a>";

        // second level
        navigationHtml += '\n<ul class="nav second">';

        $(currentGroup).children('section').has('h3').each(function(sectionIndex) {
          var currentSection = $(this);
          var currentSectionHeader = $.trim($(currentSection).children('h3:first-child').text());
          var generatedSubgroupId = currentSectionHeader.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();

          $(this).attr('id', generatedSubgroupId);
          navigationHtml += '\n\t<li><a href="#' + generatedSubgroupId + '">' + currentSectionHeader + '</a>';


          navigationHtml += '</li>';
        });

        navigationHtml += '\n</ul>';
        navigationHtml += '\n</li>\n';

      }
    });
    navigationHtml += '</ul></div>';

    // apply navigation to container
    $('.fw-sidebar .fw-sidebar-menu').append(navigationHtml);
  }
  generateNavigation();


  //----------------------------------------------------------------------
  // scrollspy for sidebar
  $('body').scrollspy({
    target: '.nav.first',
    offset: 60
  });

  // offset page after clicking on sidebar link
  $(".fw-sidebar").find("a").on("click", function(){

    setTimeout(function(){
      var winScrollTop = $(window).scrollTop();
      console.log(winScrollTop)

      $('html, body').animate({
        scrollTop: winScrollTop + 5
      }, 0);
    }, 50);

  });



  //----------------------------------------------------------------------
  // expand collapse menu

  if(typeof(Storage) !== "expand-menu") {
    // Code for localStorage/sessionStorage.
    if( localStorage.getItem("expand-menu") == undefined ){
      localStorage.setItem("expand-menu", false);
    }
  } else {
      // Sorry! No Web Storage support..
  }

  function refreshExpandableMenu(){
    var expanded = localStorage.getItem("expand-menu");
    // alert(expanded);
    var checkbox = $(".check-expand-menu [type=checkbox]");
    if(expanded == "true"){
      // alert("expanding menu");
      $(".fw-sidebar-menu").addClass("expanded");
      $(checkbox).prop('checked', true);
    } else {
      // alert("collapsing menu");
      $(".fw-sidebar-menu").removeClass("expanded");
      $(checkbox).prop('checked', false);
    }

  }

  refreshExpandableMenu();

  $(".check-expand-menu [type=checkbox]").on("change", function(){
    var checked = $(this).is(":checked");
    if(checked){
      // expand menu
      localStorage.setItem("expand-menu", "true");
    } else {
      // collapse menu
      localStorage.setItem("expand-menu", "false");
    }
    refreshExpandableMenu()
  });






// better function for taking window width
// http://stackoverflow.com/questions/11309859/css-media-queries-and-javascript-window-width-do-not-match
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function media(device){
    var windowSize = viewport().width;
    var ifSizeMatched = false;
    if (windowSize < 768 && device == "mobile"){ifSizeMatched = true}
    if (windowSize >= 768 && windowSize <= 991 && device == "tablet"){ifSizeMatched = true}
    if (windowSize >= 992 && windowSize <= 1279 && device == "desktop"){ifSizeMatched = true}
    if (windowSize >= 1280 && device == "desktop-xl"){ifSizeMatched = true}
    return ifSizeMatched;
}





  //----------------------------------------------------------------------
  // toggle collapse sidebar

  if (media("mobile")){
    localStorage.setItem("toggle-sidebar", "true");
  }


  if(typeof(Storage) !== "toggle-sidebar") {
    // Code for localStorage/sessionStorage.
    if( localStorage.getItem("toggle-sidebar") == undefined ){
      localStorage.setItem("toggle-sidebar", false);
    }
  } else {
      // Sorry! No Web Storage support..
  }

  function refreshSidebarMenu(){
    var expanded = localStorage.getItem("toggle-sidebar");
    // alert(expanded);
    var checkbox = $(".check-toggle-sidebar [type=checkbox]");
    if(expanded == "true"){
      // alert("expanding menu");
      $(".fw-wrapper").addClass("sidebar-hidden");
      $(checkbox).prop('checked', true);
    } else {
      // alert("collapsing menu");
      $(".fw-wrapper").removeClass("sidebar-hidden");
      $(checkbox).prop('checked', false);
    }

  }

  $(window).on("resize", function(){
    if ( media("mobile") ){
      localStorage.setItem("toggle-sidebar", "true");
    } else {
      localStorage.setItem("toggle-sidebar", false);
    }
    refreshSidebarMenu();
  });


  refreshSidebarMenu();

  $(".check-toggle-sidebar [type=checkbox]").on("change", function(){
    var checked = $(this).is(":checked");
    if(checked){
      // expand menu
      localStorage.setItem("toggle-sidebar", "true");
    } else {
      // collapse menu
      localStorage.setItem("toggle-sidebar", "false");
    }
    refreshSidebarMenu()
  });




    // and update sidebar scroll




    var previousMenuTitle = "";
    var sideMenu = (".fw-sidebar-menu");

    setInterval(function(){

      var currentMenu = $(".fw-sidebar ul.first > li.active");
      var currentMenuTitle = $(currentMenu).find("a").first().text();


      if( previousMenuTitle != currentMenuTitle ){

        var restorePosition = $(sideMenu).scrollTop();
        $(sideMenu).scrollTop(0);

        var currentMenuOffsetTop = $(currentMenu).offset().top;
        var sidebarMenuOffsetTop = $(sideMenu).offset().top;

        var currentMenuPositionTop = currentMenuOffsetTop - sidebarMenuOffsetTop;
        // $(sideMenu).scrollTop(currentMenuPositionTop);

        $(sideMenu).scrollTop(restorePosition);
        $(sideMenu).stop().animate({
          scrollTop: currentMenuPositionTop
        }, 500, 'easeOutSine');

      }

      previousMenuTitle = currentMenuTitle;
    }, 3000);






});

//----------------------------------------------------------------------
// calc height for menu

function updateSidebarMenuHeight(){
  var headerHeight = $(".fw-sidebar .sidebar-header").outerHeight();
  // alert("header: " + headerHeight);

  var footerHeight = $(".fw-sidebar .sidebar-footer").outerHeight();
  // alert("footer: " + footerHeight);

  var windowHeight = $(window).outerHeight();
  // alert("window: " + windowHeight);

  var sidebarMenuHeight = windowHeight - headerHeight - footerHeight;
  $(".fw-sidebar .fw-sidebar-menu").height(sidebarMenuHeight);
}



$(window).on("resize", function(){
  updateSidebarMenuHeight();
});
$(function(){
  updateSidebarMenuHeight();
});

/* ========================================================================
 * parallaxForSection
 * ======================================================================== */


// // unused - parallax for intro section
// // parallax for intro section
devconsole.log("parallaxSection loaded");

// $(window).bind('scroll',function(e){
//   parallaxScroll();
// })
// function parallaxScroll(){
//   var scrolledY = $(window).scrollTop();
//   var introHeight = $('.fw-section-intro').innerHeight();
//   if(scrolledY <= introHeight){

//     var fadeInFactor = 1 - (scrolledY / introHeight);
//     var fadeOutFactor = (scrolledY / introHeight) * 6 + "px";
//     $('.fw-section-intro').css('top', (scrolledY*0.6)+'px');
//     $('.fw-parallax-fade').css({
//       'opacity': fadeInFactor,
//       'filter': 'blur(' + fadeOutFactor + ')',
//       '-webkit-filter': 'blur(' + fadeOutFactor + ')'
//     });
//   }
// }





/* ========================================================================
 * renderCodeElements
 * ======================================================================== */


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


/* ========================================================================
 * resizableElements
 * ======================================================================== */


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





/* ========================================================================
 * stickyElements
 * ======================================================================== */



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




/* ========================================================================
 * switchcssScssButton
 * ======================================================================== */


// switch scss / css code preview
devconsole.log("switchCssScss loaded");

if( !(localStorage.documentLangMode) ){
  devconsole.log("document is opened first time, setting document mode to lang-scss");
  localStorage.setItem("documentLangMode","lang-scss");
}

var updateDocumentLangView = function(){
  devconsole.log("updateDocumentLangView called");
  if( localStorage.documentLangMode == "lang-scss" ){
    $("body").addClass("fw-viewScss");
    $("body").removeClass("fw-viewCss");

    $(".fw-switch > span").removeClass("active");
    $(".fw-switch > span.lang-scss").addClass("active");
  } else if( localStorage.documentLangMode == "lang-css" ){
    $("body").addClass("fw-viewCss");
    $("body").removeClass("fw-viewScss");

    $(".fw-switch > span").removeClass("active");
    $(".fw-switch > span.lang-css").addClass("active");
  }
}

updateDocumentLangView();

var setDocumentLangMode = function(mode){
  devconsole.log("setDocumentLangMode called");
  if(mode){
    localStorage.setItem("documentLangMode", mode);
  }
  updateDocumentLangView();
}

$(function(){

  $(".fw-switch > span").click(function(){
    // $(".fw-switch > span").removeClass("active");
    // $(this).addClass("active");

    if( $(this).hasClass("lang-scss") ){
      setDocumentLangMode("lang-scss");
    } else if( $(this).hasClass("lang-css") ){
      setDocumentLangMode("lang-css");
    }

  });

});





/* ========================================================================
 * updatePageBottomPadding
 * ======================================================================== */


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




/* ========================================================================
 * tabulators
 * ======================================================================== */


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




/* ========================================================================
 * topbar
 * ======================================================================== */


// detect type of a block and render code containers and code tooltips
devconsole.log("topbar loaded");

$(function(){


  var previousMenuTitle = "";
  function updateTopbarSection(){

    var currentSectionTitle = $(".fw-group section.active").find("h3").text();
    $(".dc-topbar .dc-section-info").html( currentSectionTitle );
    // console.log(currentSectionTitle);


    var openedSidebarGroups = $("#navbar .nav.first > li.active").length;
    // console.log(openedSidebarGroups);
    // if( $("#introduction").is(".active") ){
      // console.log("intro is active");
    // }

    // add and remove isHidden class to secInfo
    if( openedSidebarGroups > 0 && !($("#introduction").is(".active")) ){

      // when sections are opened
      if( $(".dc-topbar .dc-section-info").hasClass("isHidden") ){
        // when topbar is still hidden
        $(".dc-topbar .dc-section-info").removeClass("isHidden");
      }
    } else {
      if( !($(".dc-topbar .dc-section-info").hasClass("isHidden")) ){
        // when topbar is visible
        $(".dc-topbar .dc-section-info").addClass("isHidden");
      }
    }

  }

  setInterval(function(){
    updateTopbarSection();
  }, 300);





});

/* ========================================================================
 * updatePageHash
 * ======================================================================== */


var currentHash = "";
function updatePageHash(){
  currentHash = $("#navbar .nav.second li.active a").attr("href");
  if(history.pushState) {
    history.pushState(null, null, currentHash);
  }
  else {
    location.hash = currentHash;
  }
}


$(function(){
  setInterval(function(){
    updatePageHash();
  }, 3000);
});