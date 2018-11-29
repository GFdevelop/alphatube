function pageLoader(){	
    var currentURL = {}; 
	location.href.replace(/([^?=&]+)=([^&]*)/g, function(matched, key, value) {
		currentURL[decodeURIComponent(key)] = decodeURIComponent(value);
	});

	if ( !$('#search-row-container').length ) navbarLoader();
	
    loaderChoice();
    $("body").on("click", "a", function(e){ // TODO: disabilitare il capture per le freccette del recommender

		e.preventDefault();
		// TODO: console.log($(this).children('img').attr('alt'));
		history.pushState(null, null, $(this).attr('href')/* + '#Search'*/);
        loaderChoice();
		//~ player.loadVideoById(location.search.split('videoID=')[1].split('&')[0]);
		//~ player.loadVideoById(location.search.match('videoID=(.*)')[1]);
		player.loadVideoById(currentURL.videoID);
    });

}

function _Videopage(){
    videopageLoad();
    navbarLoader();
    //wikiLoader();
    recommenderLoader();
}

function loaderChoice(){
    // TODO: console.log($(this).children('img').attr('alt'));
    //window.history.pushState(null, null, location.pathname + $(this).attr('href')/* + '#Search'*/);
    var fileName = location.pathname.split("/").slice(-1);
    var videoID
    try {
        videoID = location.search.split('videoID=')[1].split('&')[0];
    } catch (e) {
        videoID = null;
    }
    if(fileName == 'index.html' || fileName == ''){console.log("index"); homeLoader();}
    else if (fileName == 'videopage.html' && videoID) {console.log("videopage"); _Videopage();}
    else {
        console.log("404");
        location.replace('./404.html');
        //loader404(); non è meglio avere 404 statico?
    }// TODO: sistemare 404
}
