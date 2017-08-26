//Selecting different elements from document:

const TWITCH_EMBED = $("#twitch-embed");
const TWITCH_STREAMERS = $("#twitch-streamers");
const TWITCH_SEARCH = $("#twitch-search");

//Variables, URL or other resources.
let streamerArray = ["esl_csgo","geekygoonsquad","nocopyrightsounds","tejbz","shroud","summit1g"];

var baseTwitchUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
var endTwitchUrl = "?callback=?";


window.onload = function(){
  fetchTwitchUsers(streamerArray);
}

function fetchTwitchUsers(array){
  let currentArray = [];
  
    for(var a in array){
      let user = array[a];
      let searchURL = baseTwitchUrl + array[a] + endTwitchUrl;
      $.ajax({
        url: searchURL,
        dataType: "jsonp",
        success: function(data){
           currentArray.push(checkAndInsertData(data,user));
           insertinDome(currentArray);
          }
      });
    }
}

function insertinDome(array){
  tempArray= array.sort(function(b,a){
    if(a.getOnline() == true && b.getOnline()==false){
      return 1;
    }
  
    if(a.getOnline() == false && b.getOnline()==true){
      return -1;
    }
    
    return 0;
  });
  TWITCH_STREAMERS.html("");
  for(var a in tempArray){
    var player = array[a];
    TWITCH_STREAMERS.append('<article><a href="'+ player.getTwitch() +
                            '" target="_blank">' 
                            +player.getName() + '<p>'
                            +player.getGame() + '</p><div class="row">'
                            +offlineOrOffline(player.getOnline()) 
                            +'</a></article>');
  }
}
function offlineOrOffline(boolean){
  if(boolean == true){
    return '<div class="online">Online</div>';
  }
  else {
    return '<div class="offline">Offline</div>';
  }
}

function findThisGame(data){
  if(data.stream == null){
    return "";
  }
  return data.stream.game;
}


function checkAndInsertData(data, user){
  var name = user;
  var streamer = Object.create(streamerObject);
  var game = findThisGame(data);
  streamer.init(name,data.stream,game)
  return streamer;
}

var streamerObject = {
  init: function(name,status,game){
    this.name = name;
    this.status = status || false;
    this.game = game;
  },
  getName: function(){
    return this.name;
  },
  getStatus: function(){
    return this.status;
  },
  getGame: function(){
    return this.game;
  },
  getTwitch: function(){
    return "https://www.twitch.tv/"+ this.name;
  },
  getOnline: function(){
    if(this.status == false){
      return false;
    }
    else{
      return true;
    }
  }
};
