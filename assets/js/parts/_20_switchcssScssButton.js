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



