//https://developers.google.com/youtube/iframe_api_reference?hl=it
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
	// TODO: manage when url have no query ex: http://gabriele.fulgaro.tw.cs.unibo.it/videopage.html
  player = new YT.Player('player', {
    videoId: location.search ? location.search.split('videoID=')[1].split('&')[0] : '',
    events: {
      'onReady': onPlayerReady,
    },
    playerVars:{
        //'rel': 0,     deprecato da YT dal 18/10/25 (https://developers.google.com/youtube/player_parameters#release_notes_08_23_2018)
        //'showinfo': 0 deprecato da YT dal 18/10/25 (https://developers.google.com/youtube/player_parameters#release_notes_08_23_2018)
    }
  });
}

function onPlayerReady(event) {
    //event.target.playVideo();
    buildWikiRequest();
}
