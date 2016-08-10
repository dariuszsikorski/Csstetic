// plugin - get inline style of element
devconsole.log("getInlineStyle loaded");

(function ($) {
  $.fn.inlineStyle = function (prop) {
    devconsole.log("inlineStyle called");
    return this.prop("style")[$.camelCase(prop)];
  };
}(jQuery));



