// devconsole

var devCounter = 0;
var devMode = false;
var devconsole = {};
devconsole.log = function(message){

  if(devMode && message){
    console.log(devCounter + ": " + message);
    devCounter++;
  }
}

devconsole.log("devConsole loaded");



