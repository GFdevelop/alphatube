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
	$('#search-button').attr('disabled', false);
}

// example <body onload="youtubeSearch(promiseName);">
function youtubeSearch(promise, query, maxResults) {	//defaul value is supported in ECMA v6+
	// https://developers.google.com/api-client-library/javascript/start/start-js
	gapi.client.init({
		'apiKey': 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
	}).then(function() {
		return gapi.client.request({
			'method': 'GET',
			'path': '/youtube/v3/search',
			'params': {
				'q': (query || $('#query').val()),
				'part': 'snippet',
				'maxResults': (maxResults || 12),
				'type': 'video',
				'videoCategoryId': '10'
			}
		});
	}).then(function(response) {
		promise = (promise || youtubeSearchResult);
		return promise(response.result);
	}, function(reason) {
		console.log('Error: ' + reason.result.error.message);
    });
}

function youtubeSearchResult(response) {
	console.log(response);
	if ( $('#search-row-container').length ) $('#search-row-container').empty();
	else $("body").before(
		'<div class="container" id="search-container">' +
			'<div class="row" id="search-row-container">' +
			'</div>' +
		'</div>'
	);
	// TODO: make query string https://api.jquery.com/jquery.param/
	// https://davidwalsh.name/query-string-javascript
	// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	for (var i=0; i<response.items.length; i++) {
		$('#search-row-container').append(
			'<div class="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2 text-center">' +
				'<a href="#?' + $.param(response.items[i].id) + '">' +	// use # to make single page
					'<img class="img-fluid z-depth-1" src="' + response.items[i].snippet.thumbnails.medium.url + '" alt="' + response.items[i].snippet.title + '">' +
				'</a>' +
			'</div>'
		);
	}
	
	$( "#search-row-container > div > a" ).click(function() {
		$('#search-container').remove();
	});
	
	// TODO: https://www.codeply.com/go/JuADMG3eTG/bootstrap-image-hover-css-zoom-scale
	// http://api.jquery.com/animate/
	
	// MOUSEOVER fires when the pointer moves into the child element as well, while
	// MOUSEENTER fires only when the pointer moves into the bound element.
	$("#search-row-container > div > a").mouseenter( function() {console.log('enter');} ).mouseleave( function() {console.log('out');} );
	
	// TODO: using cache
}
