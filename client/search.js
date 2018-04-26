// https://developers.google.com/youtube/v3/code_samples/javascript
// https://google-developers.appspot.com/youtube/v3/code_samples/code_snippet_instructions

// Search for a specified string.
function search() {
	gapi.client.setApiKey('AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao');	// https://gist.github.com/danviv/11156842
	gapi.client.load('youtube', 'v3', function() {
		var list = onYouTubeApiLoad();	// https://developers.google.com/api-client-library/javascript/reference/referencedocs
		onList(list);
	});
}

function onYouTubeApiLoad() {
	var q = $('#query').val();
	var list = gapi.client.youtube.search.list({	// https://developers.google.com/youtube/v3/docs/search/list#usage
		q: q,
		part: 'snippet',
		maxResults: '25',
		type: 'video',
		h1: 'en'
	});
	return list;
}

function onList(list) {
	list.execute(function(response) {
		var str = JSON.stringify(response.result, null, 4);
		//$('#search-container').html('<pre>' + str + '</pre>');
		console.log(str);
		for (var i=0; i<response.items.length; i++) {
			//$('#search-container').append('<pre>'+ JSON.stringify(response.items[i], null, 4) +'</pre>');
			$('#search-container').append('<img src="' + response.items[i].snippet.thumbnails.medium.url + '" alt="' + response.items[i].snippet.title + '">');
		}
	});
}
