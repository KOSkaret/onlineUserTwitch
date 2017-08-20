//Selecting different elements from document:

const TWITCH_EMBED = $("#twitch-embed");
const TWITCH_STREAMERS = $("#twitch-streamers");
const TWITCH_SEARCH = $("#twitch-search")

//Variables, URL or other resources.
let streamerArray = ["esl_csgo","geekygoonsquad","nocopyrightsounds","tejbz","shroud","summit1g"];

var twitchUrl = "http://player.twitch.tv/?channel=monstercat&autoplay=false";
var baseTwitchUrl = "https://wind-bow.gomix.me/twitch-api/streams/";

function getTwitchPlayerURL(user){
  return 'http://player.twitch.tv/?channel='+ user +'&autoplay=false'
}

function checkAndInsertData(data,user){
  var insertString = ""

  if(data.stream == null){
    insertString += offlineString(data._links, user);
  }
  else{
    insertString += onlineString(data.stream,data._links,user)
  }
    TWITCH_STREAMERS.append(insertString);

}

function insertFrame(element,url){
  element.html('<iframe src="'+ url +'"></iframe>');
}

function resizeEmbeddedPlayer(object){
  object.height(object.width() / 16 * 9 + 'px');
}


window.onload = function(){
  insertFrame(TWITCH_EMBED,twitchUrl);
  resizeEmbeddedPlayer(TWITCH_EMBED);

  fetchTwitchUsers(streamerArray);
}

function fetchTwitchUsers(array){
  TWITCH_STREAMERS.html("");
  for(var a in array){
    getData(array[a]);
  }
}

function getData( user){
  let searchURL = baseTwitchUrl + user;
  $.ajax({
    url: searchURL,
    dataType: "jsonp",
    success: function(data){
      checkAndInsertData(data,user);
    }
  });
}

function checkAndInsertData(data,user){
  var insertString = ""

  if(data.stream == null){
    insertString += offlineString(data._links,user);
  }
  else{
    insertString += onlineString(data.stream,data._links,user)
  }
    TWITCH_STREAMERS.append(insertString);
    document.getElementById(user).onclick = function(){
      insertFrame(TWITCH_EMBED,getTwitchPlayerURL(user));
    };
}

var resizeEvent = window.addEventListener('resize',function(){
  resizeEmbeddedPlayer(TWITCH_EMBED);
});

function offlineString(data,name){
  return '<article><a href="'+ data.channel +'"></a><h1>'+ name +'</h1>' +
  '<a href="https://www.twitch.tv/' + name  +'" target="_blank">View on twitch</a> <div class="btn" id="'+ name +'">View here</div> <div class="twitcher_status offline">Offline</div><article>';
} 

function onlineString(stream,data,name){
  return '<article><h1>'+ name +'</h1><p>'+ stream.game +'</p>'+
         '<a href="https://www.twitch.tv/' + name  +'" target="_blank">View on twitch</a><div class="btn" id="'+ name +'">View here</div> <div class="twitcher_status online">Online</div></article>';
}