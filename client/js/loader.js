var recommender = require('./recommenderloader.js');
exports.load = function (){
  var loader = '' +
  '<!DOCTYPE html><html lang="en">' +
  '<head><title>GammaTube</title><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous"><link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>' +
  '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script><script async defer src="./js/nav.js"></script><script async defer src="./js/videoload.js"></script><script async defer src="./js/recommenderloader.js"></script><script async defer src="./js/loader.js" onload="load();"></script><script async defer src="https://apis.google.com/js/api.js" onload="handleClientLoad();"></script>' +
  '</head><body>' +
    '<div class="container-fluid pt-3">' +
      '<h3 class="mt-3">Consigliati</h3>' +
  		'<div class="card-columns">' +
        recommender.recommenderLoader();
      '</div>' +
    '</div>' +
  '</body></html>'
  return loader;
  //$(".recommender").append(loader);
  //$(".body").append(loader);
};
