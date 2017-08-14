var twitchUrl = "http://player.twitch.tv/?channel=monstercat&autoplay=false";

function insertFrame(url){
  var twitchEmbed = document.getElementById("twitch-embed");
  console.log(twitchEmbed);
  twitchEmbed.innerHTML='<iframe src="'+ url +'"></iframe>';
}

insertFrame(twitchUrl);
