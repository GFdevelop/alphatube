/*
 * example
 * https://google-developers.appspot.com/youtube/v3/code_samples/
 * https://gist.github.com/danviv/11156842
*/


// https://developers.google.com/api-client-library/javascript/reference/referencedocs#loading-the-client-library
function handleClientLoad() {
	gapi.load('client', handleAPILoaded);	// Asynchronously loads the gapi libraries requested
}

function handleAPILoaded() {
	// https://developers.google.com/api-client-library/javascript/start/start-js
	gapi.client.init({
		'apiKey': 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
	});
	$('#search-button').attr('disabled', false);
	//~ $('#searchForm').on("submit",function(){youtubeSearch();});
}

function navbarLoader() {
	$('#navbar').append(
		`<a class="navbar-brand" href="#">
			<img src="./media/Logo.png" width="30" height="30" alt="aphaTube">
			AlphaTube
		</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="index.html#">Home<span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Catalog</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Info</a>
				</li>
			</ul>
			<form class="form-inline" id="searchForm" action="javascript:void(0)" onsubmit="youtubeSearch()">
				<div class="input-group">
					<select class="custom-select col-4" id="searchType" name="type">
						<option>Title</option>
						<option>Song name</option>
						<option>Artist name</option>
						<option>YouTube ID</option>
					</select>
					<input class="form-control" id="query" name="query" type="search" placeholder="Search" aria-label="Search" required>
					<div class="input-group-append">
						<button class="btn btn-warning" type="submit" id="search-button" aria-controls="Search" aria-expanded="false" disabled>
							<i class="material-icons">search</i>
						</button>
					</div>
				</div>
			</form>
		</div>`
	);
}

// example <body onload="youtubeSearch(promiseName);">
function youtubeSearch() {	//default value is supported in ECMA v6+
	$('#Search').collapse('show');
	var query = location.search ? location.search + "&" : "?";
	// type=	from 'type='
	// [^&]*	all before '&'
	// &		'&'
	// [^&]*	all before '&'
	// &?		last '&' if exist
	query = query.replace(/type=[^&]*&[^&]*&?/, '') + $('#searchForm').serialize();
	history.pushState(null, null, query);
	document.title = "GammaTube Search: " + $('#query').val();
	youtubeSearchResultContainer();
	
	//~ gapi.client.request({
		//~ 'method': 'GET',
		//~ 'path': '/youtube/v3/search',
		//~ 'params': {
			//~ 'q': $('#query').val(),
			//~ 'part': 'snippet',
			//~ 'maxResults': 12,
			//~ 'type': 'video',
			//~ 'videoCategoryId': 10
		//~ }
	//~ }).then(function(response) {
		//~ //console.log(response);
		//~ youtubeSearchResult(response.result);
	//~ });
	
	var pageToken;
	var request = gapi.client.youtube.search.list({
		q: $('#query').val(),
		part: 'snippet',
		maxResults: 12,
		type: 'video',
		videoCategoryId: 10,
		pageToken: pageToken
	});
	
	request.execute(function(response) {
		console.log(response);
		youtubeSearchResult(response.result);
	});
}

function youtubeSearchResultContainer() {
	if ( $('#search-row-container').length ) $('#search-row-container').empty();
	else $("#Search").append(
		`<div class="container-fluid">
			<div class="bg-light px-4 pt-3 pb-1 border">
				<!--<h5 class="title text-center">Search results</h5>-->
				<nav class="sticky-top" aria-label="Page navigation example">
					<ul class="pagination justify-content-center">
						<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
						<li class="page-item active"><a class="page-link" href="#">1 <span class="sr-only">(current)</span></a></li>
						<li class="page-item"><a class="page-link" href="#">2</a></li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item"><a class="page-link" href="#">Next</a></li>
					</ul>
				</nav>
				<div class="row justify-content-center" id="search-row-container">
				</div>
			</div>
		</div>`
	);
}

function youtubeSearchResult(response) {
	//console.log(response);
	// TODO: make query string https://api.jquery.com/jquery.param/
	// https://davidwalsh.name/query-string-javascript
	// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	for (var i=0; i<response.items.length; i++) {
		$('#search-row-container').append(
			'<div class="card card-columns col-lg-2 col-md-3 col-sm-4 px-0 mb-2">' +
				'<a href="?videoID=' + response.items[i].id.videoId + '">' +
					'<img class="card-img-top img-fluid" src="' + response.items[i].snippet.thumbnails.medium.url + '" alt="' + response.items[i].snippet.title + '">' +
					'<div class="card-body">' +
						'<h6 class="card-title">' + response.items[i].snippet.title + '</h6>' +
					'</div>' +
				'</a>' +
			'</div>'
		);
	}
	
	$( "#search-row-container > div > a" ).click(function() {
		$('#Search').collapse('hide');
	});
	
	// TODO: https://www.codeply.com/go/JuADMG3eTG/bootstrap-image-hover-css-zoom-scale
	// http://api.jquery.com/animate/
	
	// MOUSEOVER fires when the pointer moves into the child element as well, while
	// MOUSEENTER fires only when the pointer moves into the bound element.
	$("#search-row-container > div").mouseenter( function() {
		//$(this).siblings().removeClass('col-lg-2 col-md-3 col-sm-4');
		//$(this).siblings().addClass('col');
		$(this).removeClass('col-lg-2 col-md-3 col-sm-4');
		$(this).addClass('col');
	}).mouseleave( function() {
		//$(this).siblings().addClass('col-lg-2 col-md-3 col-sm-4');
		//$(this).siblings().removeClass('col');
		$(this).addClass('col-lg-2 col-md-3 col-sm-4');
		$(this).removeClass('col');
	});
	
	// TODO: sFrm class for card
	
	// TODO: using cache
}
