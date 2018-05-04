function recommenderLoader() {
  // TODO: Rimuovere urlVid e da statici e farli dinamici
  // TODO: Generare da[] e urlVid[] e con quello autogenerare le tumbnail
  var da = ["Da YouTube", "Dal recommender 1", "Dal recommender 2", "Dal recommender 3", "Dal recommender 4", "Dal recommender 5"];

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
  var recommender1 = [
    {
  		"category": "Pop",
  		"artist": "Frank Sinatra",
  		"title": "Somethin' Stupid",
  		"videoID": "PoSbnAFvqfA"
  	},
  	{
  		"category": "pop",
  		"artist": "Tony tammaro",
  		"title": "Scalea",
  		"videoID": "X2nQWeD1JUY"
  	},
    {
  		"category": "pop",
  		"artist": "Bag Raider",
  		"title": "Shooting Stars",
  		"videoID": "feA64wXhbjo"
  	}
  ]
  var recommender2 = [
    {
  		"category": "Rock",
  		"artist": "Muse",
  		"title": "New Born",
  		"videoID": "qhduQhDqtb4"
  	},
  	{
  		"category": "Rock",
  		"artist": "Paolo Nutini",
  		"title": "Iron Sky",
  		"videoID": "ELKbtFljucQ"
  	},
  	{
  		"category": "Metal",
  		"artist": "Nightwish",
  		"title": "Over The Hills And Far Away",
  		"videoID": "CwED4C5FJuo"
  	},
  	{
  		"category": "Punk",
  		"artist": "Crystal Castles",
  		"title": "Baptism",
  		"videoID": "vStjmYxetY0"
  	}
  ]
  var recommender3 = [
    {
  		"category": "Rock",
  		"artist": "Linkin Park",
  		"title": "Bleed it Out",
  		"videoID": "OnuuYcqhzCE"
  	},
  	{
  		"category": "Rock",
  		"artist": "Litfiba",
  		"title": "Gioconda",
  		"videoID": "l51-ebCdCJo"
  	},
  	{
  		"category": "Hip Hop",
  		"artist": "Duplici",
  		"title": "21 grammi",
  		"videoID": "9H_-gIMly_U"
  	},
  	{
  		"category": "Hip Hop",
  		"artist": "Bolo by night",
  		"title": "Inoki",
  		"videoID": "L2WCSlqRZ74"
  	}
  ]
  var recommender4 = [
    {
  		"category": "Rock",
  		"artist": "Oasis",
  		"title": "Wonderwall",
  		"videoID": "bx1Bh8ZvH84"
  	},
  	{
  		"category": "Rock",
  		"artist": "Bryan Scary & the Shredding Tears",
  		"title": "Imitation of The Sky",
  		"videoID": "Xxi5CJo8UbM"
  	},
  	{
  		"category": "Rock",
  		"artist": "Nickelback",
  		"title": "How you remind me",
  		"videoID": "1cQh1ccqu8M"
  	},
  	{
  		"category": "Rock",
  		"artist": "White Stripes",
  		"title": "Seven Nation Army",
  		"videoID": "0J2QdDbelmY"
  	}
  ]
  var recommender5 = [
    {
  		"category": "Rock",
  		"artist": "Foo fighters",
  		"title": "Learn to fly",
  		"videoID": "1VQ_3sBZEm0"
  	},
  	{
  		"category": "Rock",
  		"artist": "Green Day",
  		"title": "Boulevard of broken dreams",
  		"videoID": "Soa3gO7tL-c"
  	},
  	{
  		"category": "Rock",
  		"artist": "Eddie Vedder",
  		"title": "Society",
  		"videoID": "lm8oxC24QZc"
  	},
  	{
  		"category": "Rock 10 ",
  		"artist": "Cellar Darling",
  		"title": "Avalanche",
  		"videoID": "NWMiBj0yDJg"
  	}
  ]

  var recommender = "";
  /*for (var i = 0; i < urlVid.length; i++) {
    recommender += singleFrame(da, urlVid, i)
  }*/
  recommender += singleFrame(da, recommender0, 0);
  recommender += singleFrame(da, recommender1, 1);
  recommender += singleFrame(da, recommender2, 2);
  recommender += singleFrame(da, recommender3, 3);
  recommender += singleFrame(da, recommender4, 4);
  recommender += singleFrame(da, recommender5, 5);

  $(".recommender").append(recommender);
}

function singleFrame(da, rec, i) {
  var frame = '' +
  '<div class="col-6 col-md-4 col-lg-3 pb-3">' +
    '<div class="shadow rounded-top sFrm border">' +
      '<h6 class = "text-right p-1">'
        if (da[i] != undefined) {frame += da[i]}
        else {frame += 'Dal Recommender'}
      frame += '</h6>' +
      '<div id="carousel' + i + '" class="carousel slide" data-ride="carousel">' +
        '<ol class="carousel-indicators">'
          for (var e = 0; e < rec.length; e++) {
            frame += '<li data-target="#carousel' + i + '" data-slide-to="' + e + '"'
            if (e == 0) {frame += 'class="active"'}
            frame += '></li>'
          }
        frame += '</ol>' +
        '<div class="carousel-inner">'
          for (e = 0; e < rec.length; e++) {
            frame += '<div class=\"carousel-item '
            if (e == 0) {frame += 'active'}
            //console.log(rec[e].videoID);
            frame += '">' +
            '<a href="./videopage.html?' + $.param(rec[e]) +'" style="text-decoration:none;">' +
              '<div class="d-none d-block text-left text-muted pt-1 pl-1 pr-1 pb-0 mb-0">' +
                '<p class = "h5">' + rec[e].artist + '</p>' +
                '<p class = "h5"> <small>' + rec[e].title + '</small> </p>' +
              '</div>' +
              '<div>' +
                '<img class="d-block w-100" src="https://i.ytimg.com/vi/'
                frame += rec[e].videoID
                frame += '/mqdefault.jpg">' +
                '<a class="carousel-control-prev" href="#carousel' + i + // TODO: O trovare un modo per certrare le freccie o eliminarle
                '" role="button" data-slide="prev"><span class="carousel-control-prev-icon"' +
                'aria-hidden="true"></span><span class="sr-only">Previous</span></a>' +
                '<a class="carousel-control-next" href="#carousel' + i +
                '" role="button" data-slide="next"><span class="carousel-control-next-icon"' +
                'aria-hidden="true"></span><span class="sr-only">Next</span></a>' +
              '</div>' +
            '</a>' +
          '</div>'
          }
        frame += '</div>' +
      '</div>' +
    '</div>' +
  '</div>'
  return frame;
}

$(document).ready(function(){
    $("div.sFrm").mouseover(function(){
        //$(this).css("border", "1px solid #b9b9b9");
        $(this).addClass("border-secondary");
    });
    $("div.sFrm").mouseout(function(){
        //$(this).css("border", "1px solid #e7e7e7");
        $(this).removeClass("border-secondary");
    });
});

$('.carousel').carousel({
  interval: 2000
})
