$(function(){$(".mainbar .getit-link").on("click",function(){var t=$(window).outerHeight();$("html, body").stop().animate({scrollTop:$("section.getit").offset().top-t/2},1500)}),$(".mainbar .intro-link").on("click",function(){$("html, body").stop().animate({scrollTop:$("section.description").offset().top},1500)});var t=new Date,e=t.getFullYear();$(".current-year").text(e)});
var devCounter=0,devMode=!1,devconsole={};devconsole.log=function(e){0!=devMode&&e&&(console.log(devCounter+": "+e),devCounter++)},devconsole.log("devConsole loaded");
devconsole.log("tabulations loaded");var refreshTabulators=function(e){devconsole.log("refreshTabulators called"),$(e).children(".active").length||$(e).children().first().addClass("active");var t=$(e).children(".active").index(),o=$(e).next(".fw-tabs"),s=$(o).children().eq(t);$(s).addClass("active").removeClass("hidden"),$(o).children().not(s).each(function(){$(this).addClass("hidden").removeClass("active")})};$(function(){$(".fw-tabulators").each(function(){refreshTabulators($(this))}),$(".fw-tabulators > *").click(function(){if(!$(this).hasClass("active")){var e=$(this).closest(".fw-tabulators");$(this).addClass("active"),$(e).children().not($(this)).removeClass("active"),refreshTabulators(e)}})});
function refreshDistances(){var t=$(window).innerWidth()/1.75+$(window).scrollLeft(),e=$(window).innerHeight()/1.75+$(window).scrollTop();$("section").each(function(){var o=$(this).pointRectDistance(t,e);0>=o?$(this).hasClass("reveal")||$(this).addClass("reveal"):$(this).hasClass("reveal")})}$.fn.pointRectDistance=function(t,e){var o=$(this).offset().left,s=$(this).offset().top,a=$(this).outerWidth(),i=$(this).outerHeight(),n=Math.max(Math.abs(t-o-a/2)-a/2,0),l=Math.max(Math.abs(e-s-i/2)-i/2,0);return Math.sqrt(n*n+l*l)},setInterval(function(){refreshDistances()},100);
