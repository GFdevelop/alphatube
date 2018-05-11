function buildWikiRequest(){
    gapi.client.init({
		'apiKey': 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
	}).then(function() {
		return gapi.client.request({
			'method': 'GET',
			'path': '/youtube/v3/commentThreads',
			'params': {
				'part': 'snippet',
                'order': 'relevance',
                'moderationStatus': 'published',
                'videoId': player.getVideoData()['video_id'],
				'maxResults': 25,
                'fields': 'items(snippet(topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,likeCount,textDisplay))))'
			}
		});
    }).then(function(response) {
        console.log(response);
    });
}

function executeRequest(request){
    console.log(request.execute());
}