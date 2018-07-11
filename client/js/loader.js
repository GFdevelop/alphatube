function pageLoader(){
    loaderChoice();
    $("body").on("click", "a", function(e){
		e.preventDefault();
        loaderChoice();
    });

}

function loaderChoice(){
    // TODO: console.log($(this).children('img').attr('alt'));
    //window.history.pushState(null, null, location.pathname + $(this).attr('href')/* + '#Search'*/);
    if(location.search){
        if (!location.search.split("videoID")) homeLoader();
        else {videopageLoad();navbarLoader();recommenderLoader();}
    }else homeLoader();
    //else loader404();
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
