// https://google-developers.appspot.com/youtube/v3/code_samples/code_snippet_instructions
// https://developers.google.com/youtube/v3/docs/search/list#usage
// https://developers.google.com/youtube/v3/code_samples/javascript

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);	// https://gist.github.com/danviv/11156842
}

function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao');
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    var str = JSON.stringify(response.result, null, 2);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}
