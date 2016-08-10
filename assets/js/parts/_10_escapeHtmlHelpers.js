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


