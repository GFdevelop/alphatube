function recommenderLoader() {
  // TODO: Rimuovere urlVid e da statici e farli dinamici
  // TODO: Generare da[] e urlVid[] e con quello autogenerare le tumbnail
  var da = ["da YouTube", "dal recommender 1", "dal recommender 2", "dal recommender 3", "dal recommender 4", "dal recommender 5"];

  var urlVid = [
    a =
      [{videoId : "vSbshrvmfsY"},
      {videoId : "b4ozdiGys5g"},
      {videoId : "QQ_3S-IQm38"},
      {videoId : "eVTXPUF4Oz4"}]
    ,

    a =
      [{videoId : "ScNNfyq3d_w"},
      {videoId : "8sgycukafqQ"},
      {videoId : "MQZjkKQGChU"}]

    /*
    [
      {videoId : "bx1Bh8ZvH84"},
      {videoId : "JWnX41TBFF4"}
    ],
    [
      {videoId : "CD-E-LDc384"},
      {videoId : "iT6vqeL-ysI"},
      {videoId : "kXYiU_JCYtU"}
    ],
    [
      {videoId : "KQ6zr6kCPj8"},
      {videoId : "orgycZTgvUQ"}
    ],
    [
      {videoId : "g2N0TkfrQhY"},
      {videoId : "xXLXgGJ5mIg"},
      {videoId : "JHdmkP-nfsA"}
    ]
    */
  ];

  var recommender = "";
  for (var i = 0; i < urlVid.length; i++) {
    recommender += singleFrame(da, urlVid, i)
  }

  //recommender += "</div></div></div>"
  $(".recommender").append(recommender);
}

function singleFrame(da, urlVid, i) {
  var frame = '' +
  '<div class="col-4 text-center pb-2">' +
    '<h4>' + da[i] + '</h4>' +
    '<div id="carousel' + i + '" class="carousel slide" data-ride="carousel">' +
    '<ol class="carousel-indicators">'
      for (var e = 0; e < urlVid[i].length; e++) {
        frame += '<li data-target="#carousel' + i + '" data-slide-to="' + e + '"></li>'
      }
    frame += '</ol>' +
    '<div class="carousel-inner">'
      for (e = 0; e < (urlVid[i]).length; e++) {
        frame += '<div class=\"carousel-item '
        if (e == 0) {frame += 'active'}
        console.log(urlVid[i].a[e].videoId);
        frame += '"><a href="./videopage.html?videoId=' + $.param(urlVid[i].a[e].videoId) + // TODO: referral del sito fatto con jquery
        '"><img class="d-block w-100" src="https://i.ytimg.com/vi/'
        frame += urlVid[i][e].videoId // TODO: Assolutamente da cambiare
        frame += '/mqdefault.jpg"></a></div>'
      }
    frame += '</div>' +
    '<a class="carousel-control-prev" href="#carousel' + i +
    '" role="button" data-slide="prev"><span class="carousel-control-prev-icon"' +
    'aria-hidden="true"></span><span class="sr-only">Previous</span></a>' +
    '<a class="carousel-control-next" href="#carousel' + i +
    '" role="button" data-slide="next"><span class="carousel-control-next-icon"' +
    'aria-hidden="true"></span><span class="sr-only">Next</span></a>' +
    '</div>' +
    '</div>'
  return frame;
}
