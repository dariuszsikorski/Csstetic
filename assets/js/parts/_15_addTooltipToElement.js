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



