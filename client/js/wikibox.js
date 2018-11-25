function wikiLoader(){
    dbpediaRequest();
}

function dbpediaRequest(){
    var request = gapi.client.youtube.search.list({
	   q: $('#query').val(),
	   part: 'snippet'
    }).execute(function(response) {
	   console.log(response);
    });   
}