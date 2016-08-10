var currentHash = "";
function updatePageHash(){
  currentHash = $("#navbar .nav.second li.active a").attr("href");
  if(history.pushState) {
    history.pushState(null, null, currentHash);
  }
  else {
    location.hash = currentHash;
  }
}


$(function(){
  setInterval(function(){
    updatePageHash();
  }, 3000);
});