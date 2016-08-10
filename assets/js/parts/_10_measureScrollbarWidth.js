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