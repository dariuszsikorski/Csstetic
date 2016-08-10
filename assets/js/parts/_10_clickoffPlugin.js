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



