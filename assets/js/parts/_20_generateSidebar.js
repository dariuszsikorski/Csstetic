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