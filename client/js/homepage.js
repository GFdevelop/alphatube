function homeLoader(){
    $.getJSON("http://site1825.tw.cs.unibo.it/video.json", function(data){
              var homepage = '' +
              '<div class="container">' +
                '<div class="row justify-content-center">'+
                    '<div class="col-sm-6 col-md-5 col-lg-4 text-center mb-4">'+
                   ' <div class="ml-1 mr-1">'+
                        '<img class= "img-fluid" src="media/GammaTubeLogo.png" alt= "Responsive Logo" >'+
                       ' </div>'+
                        '<div class="text-center">'+
                        '<div class="input-group ">'+
                            '<input type="text" class="form-control" placeholder="Search for...">'+
                           ' <div class="input-group-append">'+
                            '<button class="btn btn-secondary" type="button">Go!</button>'+
                            '</div>'+
                        '</div>'+
                       ' </div>' +
                   ' </div>'+
                    '</div>'+
                     '<div class= "card-deck">'
                         for (var i=0; i<data.length; i++){
                             homepage += '<div class="mb-2 col-sm-5 col-md-4 col-lg-3 p-1">' +
                                 '<div class="card sFrm"> '+
                                    '<a href="./videopage.html?videoID='+ data[i].videoID+'"style="text-decoration:none;">'+
                             ' <img class="card-img-top" src="https://i.ytimg.com/vi/' + data[i].videoID + '/mqdefault.jpg" alt="Card image cap">'+
                             ' <div class="card-body">'+
                             '<h5 class="card-title text-blue text-truncate"> <marquee>'+ data[i].title +' </marquee></h5>'+
                             ' <p class="card-text text-orange"> Category: ' + data[i].category +' <br>Artist: ' + data[i].artist +'</p>'+
                             ' </div>'+
                             ' </a>'+
                             ' </div>'+
                                 '</div>'
                        }
                
                    homepage += '</div>'
                
              $(".homepage").append(homepage)  
    
    });
}
