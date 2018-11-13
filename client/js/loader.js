function pageLoader(){
    loaderChoice();
    $("body").on("click", "a", function(e){ // TODO: disabilitare il capture per le freccette del recommender
		e.preventDefault();
        loaderChoice();
    });

}

function _Videopage(){
    videopageLoad();
    navbarLoader();
    //TODO: wikiloader();
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
 /*
    var load = recommenderLoader();

  $(".loader").append(load);
  if ( !$('#search-row-container').length ) navbarLoader();
	//var tmp = $('#tester').html();
	$("body").on("click", "a", function(e) {
		e.preventDefault();

		player.loadVideoById(location.search.split('videoID=')[1].split('&')[0]);
	});*/
    //~ var load;
    //~ if (0 /*homepage*/){
        //~ load = homepage();
    //~ } else if (1 /*videopage*/){
        //~ load = recommenderLoader();
    //~ } else {
        //~ $("body").addClass("bgn");
        //~ load = loader404();
    //~ }
    //~ $(".loader").append(load);
