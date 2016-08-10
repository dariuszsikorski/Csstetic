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