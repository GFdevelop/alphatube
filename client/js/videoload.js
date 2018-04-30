//https://developers.google.com/youtube/iframe_api_reference?hl=it
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoId = function() {
  var youtubeGetId = 'sWEOoenLWNE'; // TODO: cambiare id statico con l'ID dell'URL
  return youtubeGetId;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: videoId(),
    events: {
      'onReady': onPlayerReady,
    },
    playerVars: {
      'rel': 0,
      'showinfo': 0
    }

  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}
