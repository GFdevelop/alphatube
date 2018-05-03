function recommenderLoader() {
  // TODO: Rimuovere urlVid e da statici e farli dinamici
  // TODO: Generare da[] e urlVid[] e con quello autogenerare le tumbnail
  var da = ["Da YouTube", "Dal recommender 1", "Dal recommender 2", "Dal recommender 3", "Dal recommender 4", "Dal recommender 5"];

  var urlVid = [
     ["vSbshrvmfsY", "b4ozdiGys5g", "QQ_3S-IQm38", "eVTXPUF4Oz4"],
     ["ScNNfyq3d_w", "8sgycukafqQ", "MQZjkKQGChU"],
     ["bx1Bh8ZvH84", "JWnX41TBFF4"],
     ["CD-E-LDc384", "iT6vqeL-ysI", "kXYiU_JCYtU"],
     ["KQ6zr6kCPj8", "orgycZTgvUQ"],
     ["g2N0TkfrQhY", "xXLXgGJ5mIg", "JHdmkP-nfsA"]
   ];

  var recommender = "";
  for (var i = 0; i < urlVid.length; i++) {
    recommender += singleFrame(da, urlVid, i)
  }

  //recommender += "</div></div></div>"
  $(".recommender").append(recommender);
}

function singleFrame(da, urlVid, i) {
  prsObj = new Object();
  var frame = '' +
  '<div class="col-4 pb-3">' +
    '<div class="border border-light rounded-top">' +
      '<h6 class = "text-right">'
        if (da[i] != undefined) {frame += da[i]}
        else {frame += 'Dal Recommender'}
      frame += '</h6>' +
      '<div id="carousel' + i + '" class="carousel slide" data-ride="carousel">' +
      '<ol class="carousel-indicators">'
        for (var e = 0; e < urlVid[i].length; e++) {
          frame += '<li data-target="#carousel' + i + '" data-slide-to="' + e + '"'
          if (e == 0) {frame += 'class="active"'}
          frame += '></li>'
        }
      frame += '</ol>' +
      '<div class="carousel-inner">'
        for (e = 0; e < (urlVid[i]).length; e++) {
          frame += '<div class=\"carousel-item '
          if (e == 0) {frame += 'active'}
          prsObj.videoId = urlVid[i][e];
          //console.log(prsObj);
          frame += '">' +
          '<a href="./videopage.html?' + $.param(prsObj) +'" style="text-decoration:none;">' +
            '<div class="d-none d-md-block text-left text-muted pt-1 pl-1 pr-1 pb-0 mb-0">' +
              '<h5>' + urlVid[i][e] + '</h5>' + // TODO: prendere gruppo e titolo attraverso i'id
              '<h5> <small>' + urlVid[i][e] + '</small> </h5>' +
            '</div>' +
            '<img class="d-block w-100" src="https://i.ytimg.com/vi/'
            frame += urlVid[i][e] // TODO: Assolutamente da cambiare
            frame += '/mqdefault.jpg">' +
          '</a>' +
        '</div>'
        }
      frame += '</div>' +
    '</div>' +
    /*
    '<a class="carousel-control-prev" href="#carousel' + i +
    '" role="button" data-slide="prev"><span class="carousel-control-prev-icon"' +
    'aria-hidden="true"></span><span class="sr-only">Previous</span></a>' +
    '<a class="carousel-control-next" href="#carousel' + i +
    '" role="button" data-slide="next"><span class="carousel-control-next-icon"' +
    'aria-hidden="true"></span><span class="sr-only">Next</span></a>' +
    */
    '</div>' +
  '</div>'
  return frame;
}
