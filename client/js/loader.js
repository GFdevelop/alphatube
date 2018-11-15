function pageLoader(){
	
    var currentURL = {}; 
	location.href.replace(/([^?=&]+)=([^&]*)/g, function(matched, key, value) {
		currentURL[decodeURIComponent(key)] = decodeURIComponent(value);
	});
	
	var load = recommenderLoader();

	$(".loader").append(load);
	if ( !$('#search-row-container').length ) navbarLoader();
	//var tmp = $('#tester').html();
	$("body").on("click", "a", function(e) {
		e.preventDefault();
		// TODO: console.log($(this).children('img').attr('alt'));
		history.pushState(null, null, $(this).attr('href')/* + '#Search'*/);
		//~ player.loadVideoById(location.search.split('videoID=')[1].split('&')[0]);
		//~ player.loadVideoById(location.search.match('videoID=(.*)')[1]);
		player.loadVideoById(currentURL.videoID);
	});
}
