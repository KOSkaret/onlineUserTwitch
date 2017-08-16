var twitchUrl = "http://player.twitch.tv/?channel=monstercat&autoplay=false";
var twitchEmbed = document.getElementById("twitch-embed");

function insertFrame(url){
  twitchEmbed.innerHTML='<iframe src="'+ url +'"></iframe>';
}

insertFrame(twitchUrl);

var resizeEvent = window.addEventListener('resize',function(){
    twitchEmbed.style.height = twitchEmbed.clientWidth / 16 * 9 + 'px';
});