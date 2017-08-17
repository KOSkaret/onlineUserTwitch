var twitchUrl = "http://player.twitch.tv/?channel=monstercat&autoplay=false";
var twitchEmbed = document.getElementById("twitch-embed");

function insertFrame(url){
  twitchEmbed.innerHTML='<iframe src="'+ url +'"></iframe>';
}

function resizeEmbeddedPlayer(object){
  object.style.height = object.clientWidth / 16 * 9 + 'px';
}

var resizeEvent = window.addEventListener('resize',function(){
    resizeEmbeddedPlayer(twitchEmbed);
});


insertFrame(twitchUrl);

window.onload = function(){
  resizeEmbeddedPlayer(twitchEmbed);
}