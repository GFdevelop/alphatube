function recommenderLoader() {
  // TODO: Rimuovere urlVid e da statici
  // TODO: Generare da[] e urlVid[] e con quello autogenerare le tumbnail
  var da = ["da YouTube", "dal recommender", "dal recommender", "dal recommender"];
  var urlVid0 = ["vSbshrvmfsY", "b4ozdiGys5g", "QQ_3S-IQm38", "eVTXPUF4Oz4"];
  var urlVid1 = ["ScNNfyq3d_w", "8sgycukafqQ", "MQZjkKQGChU"];
  var urlVid2 = ["bx1Bh8ZvH84", "JWnX41TBFF4"];
  var urlVid3 = ["CD-E-LDc384", "iT6vqeL-ysI",  "kXYiU_JCYtU"];

  var recommender = "<div class=\"col-md-8 pt-2 float-left\"><h3 class=\"pl-3 pt-3\">Consigliati</h3><div class=\"container\"><div class=\"row\">"

  recommender += singleFrame(da, urlVid0, 0);
  recommender += singleFrame(da, urlVid1, 1);
  recommender += singleFrame(da, urlVid2, 2);
  recommender += singleFrame(da, urlVid3, 3);

  recommender += "</div></div></div>"
  $(".recommender").append(recommender);
}

function singleFrame(da, urlVid, i) {
  var frame = "<div class=\"col-sm-6 text-center pb-2\"><h4>" + da[i] + "</h4>" + "<div id=\"carousel" + i + "\" class=\"carousel slide\" data-ride=\"carousel\">" + "<ol class=\"carousel-indicators\">"
  for (var e = 0; e < urlVid.length; e++) {
    frame += "<li data-target=\"#carousel" + i + "\" data-slide-to=\"" + e + "\"></li>"
  }
  frame += "</ol>" + "<div class=\"carousel-inner\">"
  for (e = 0; e < urlVid.length; e++) {
    frame += "<div class=\"carousel-item "
    if (e == 0) {frame += "active"}
    frame += "\">" + "<a href=\"https://www.youtube.com/watch?v=" + urlVid[e] + "\">" +
    "<img class=\"d-block w-100\" src=\"http://img.youtube.com/vi/" + urlVid[e] //assolutamente da cambiare
    + "/0.jpg\"></a></div>"
  }
  frame += "</div>" +
  "<a class=\"carousel-control-prev\" href=\"#carousel" + i +
  "\" role=\"button\" data-slide=\"prev\"><span class=\"carousel-control-prev-icon\"" +
  " aria-hidden=\"true\"></span><span class=\"sr-only\">Previous</span></a>" +
  "<a class=\"carousel-control-next\" href=\"#carousel" + i +
  "\" role=\"button\" data-slide=\"next\"><span class=\"carousel-control-next-icon\"" +
  "aria-hidden=\"true\"></span><span class=\"sr-only\">Next</span></a>" +
  "</div></div>"
  return frame;
}
