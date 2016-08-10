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