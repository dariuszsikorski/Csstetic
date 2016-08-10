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



