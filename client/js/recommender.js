function recommenderLoader() {
    // TODO: Rimuovere urlVid e da statici e farli dinamici
    // TODO: Generare da[] e urlVid[] e con quello autogenerare le tumbnail
    var recommender0 = [
        {
      		"category": "Indie",
      		"artist": "Pinguini Tattici Nucleari",
      		"title": "Tetris",
      		"videoID": "MQZjkKQGChU"
      	},
      	{
      		"category": "Rock",
      		"artist": "Radiohead",
      		"title": "True Love Waits",
      		"videoID": "z2hZ9CTLICs"
      	},
      	{
      		"category": "Jazz",
      		"artist": "Glenn Miller",
      		"title": "In the mood",
      		"videoID": "6vOUYry_5Nw"
      	},
      	{
      		"category": "Jazz",
      		"artist": "Benny Goodman",
      		"title": "Why don't you do right",
      		"videoID": "4zRwze8_SGk"
      	},
      	{
      		"category": "Trance",
      		"artist": "Musica Per Bambini",
      		"title": "Preghiera Delle Palle Di Neve",
      		"videoID": "vF8WkIsFrrk"
      	}
    ]

    $(".recommender").append(`
        <h3 class="mt-3">Consigliati</h3>
        <div class="card-deck recFrame"></div>`
    );

    var da = "Dal recommender";
    for (var i = 0; i < 6; i++) {
        singleFrame(da + ` ${i}`, recommender0, i);
    }
}

function singleFrame(da, rec, counter) {
    var frame = `
    <div class="col-sm-6 col-md-4 col-lg-3 p-1 m-0">
        <div class="card m-0 sFrm">
            <div id="carousel${counter}" class="carousel slide " data-ride="carousel">
                <ol class="carousel-indicators">` /* col-6 col-md-4 col-lg-3*/
                    for (var e = 0; e < rec.length; e++) {
                      frame += `<li data-target="#carousel${counter}" data-slide-to="${e}"`;
                      if(e == 0){frame += 'class="active"'};
                      frame += '></li>';
                    }
                frame += `</ol>
                <div class="carousel-inner">`
                    for (e = 0; e < rec.length; e++) {
                        frame += '<div class="carousel-item ';
                        if (e == 0) {frame += 'active'}; frame += `">
                        <a href="?${$.param(rec[e])}" style="text-decoration:none;">
                            <div class="card-body text-secondary p-2">
                                <h5 class="card-title text-right text-dark font-weight-bold">`
                                    if (da != undefined) {frame += da} else {frame += 'Dal Recommender'};
                                frame += `</h5>
                                <p class="card-text mb-1 h6">${rec[e].artist}</p>
                                <p class="card-text h6"><small class="text-muted">${rec[e].title}</small></p>
                            </div>
                            <img class="card-img-bottom" src="https://i.ytimg.com/vi/${rec[e].videoID}/mqdefault.jpg" alt="Card image cap">
                        </a>
                    </div>`
                }
                frame += `</div>
                <a class="carousel-control-prev mt-5" href="#carousel${counter}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon mt-5" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next mt-5" href="#carousel${counter}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon mt-5" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>`
    $(".recFrame").append(frame);
}

$(document).ready(function(){
    $("div.sFrm").mouseover(function(){
        $(this).addClass("border-secondary");
    });
    $("div.sFrm").mouseout(function(){
        $(this).removeClass("border-secondary");
    });
});
