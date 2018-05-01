function recommenderLoader() {
  var da = ["da YouTube", "dal recommender", "dal recommender", "dal recommender"];
  var urlTmb = ["http://francesco.fornari2.tw.cs.unibo.it/tmp/1.jpg", "http://francesco.fornari2.tw.cs.unibo.it/tmp/2.jpg", "http://francesco.fornari2.tw.cs.unibo.it/tmp/3.jpg", "http://francesco.fornari2.tw.cs.unibo.it/tmp/4.jpg", "http://francesco.fornari2.tw.cs.unibo.it/tmp/5.jpg"];
  var urlVid = ["vSbshrvmfsY", "b4ozdiGys5g", "QQ_3S-IQm38", "kXYiU_JCYtU", "eVTXPUF4Oz4"];
  // TODO: Rimuovere urlTmb, urlVid e da
  // TODO: Farsi dare in imput urlVid[] e con quello autogenerare urlTmb[]
  // TODO: Prendere in imput anche da[]

  var scheletro = "<div class=\"col-md-8 pt-2 float-left\">" + "<h3 class=\"pl-3 pt-3\">Consigliati</h3>" + "<div class=\"container\">" + "<div class=\"row\">"
  for (var i = 0; i < da.length; i++) {
    scheletro += singleFrame(da, urlVid, urlTmb, i);
  }
  scheletro += "</div></div></div>"

  $(".recommender").append(scheletro);
}

function singleFrame(da, urlVid, urlTmb, i, carousel) {
  var frame = "<div class=\"col-sm-6 text-center pb-2\"><h4>" + da[i] + "</h4>" + "<div id=\"carousel" + i + "\" class=\"carousel slide\" data-ride=\"carousel\">" + "<ol class=\"carousel-indicators\">"
  for (var e = 0; e < urlVid.length; e++) {
    frame += "<li data-target=\"#carousel" + i + "\" data-slide-to=\"" + e + "\"></li>"
  }
  frame += "</ol>" + "<div class=\"carousel-inner\">"
  frame += "<div class=\"carousel-item active\">" + "<a href=\"https://www.youtube.com/watch?v=" + urlVid[0] + "\"> <img class=\"d-block w-100\" src=\"" + urlTmb[0] + "\" alt=\"Slide 0\"></a></div>"
  for (e = 1; e < urlVid.length; e++) {
    frame += "<div class=\"carousel-item\">" + "<a href=\"https://www.youtube.com/watch?v=" + urlVid[e] + "\"> <img class=\"d-block w-100\" src=\"" + urlTmb[e] + "\" alt=\"Slide " + e + "\"></a></div>"
  }
  frame += "</div>" + "<a class=\"carousel-control-prev\" href=\"#carousel" + i + "\" role=\"button\" data-slide=\"prev\"><span class=\"carousel-control-prev-icon\"" + " aria-hidden=\"true\"></span><span class=\"sr-only\">Previous</span></a>" + "<a class=\"carousel-control-next\" href=\"#carousel" + i + "\" role=\"button\" data-slide=\"next\"><span class=\"carousel-control-next-icon\"" + "aria-hidden=\"true\"></span><span class=\"sr-only\">Next</span></a></div></div>"
  return frame;
}
/*var videoInfo = {
  var urlTmb = [
    "http://francesco.fornari2.tw.cs.unibo.it/tmp/1.jpg",
    "http://francesco.fornari2.tw.cs.unibo.it/tmp/2.jpg",
    "http://francesco.fornari2.tw.cs.unibo.it/tmp/3.jpg",
    "http://francesco.fornari2.tw.cs.unibo.it/tmp/4.jpg",
    "http://francesco.fornari2.tw.cs.unibo.it/tmp/5.jpg",
  ],
  var urlVid = [
    "vSbshrvmfsY",
    "b4ozdiGys5g",
    "QQ_3S-IQm38",
    "kXYiU_JCYtU",
    "eVTXPUF4Oz4",
  ],
  videoUrl: function (i) {
    if (i === undefined){
      i = 0;
    }
    return this.urlVid[i];
  }

  videoTmb: function(i) {
    if (i === undefined){
      i = 0;
    }
    return this.urlTmb[i];
  }
}*/
