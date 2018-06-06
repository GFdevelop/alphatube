function pageLoader(){
    var load;
    if (0 /*homepage*/){
        load = homepage();
    } else if (1 /*videopage*/){
        load = recommenderLoader();
    } else {
        $("body").addClass("bgn");
        load = loader404();
    }
    $(".loader").append(load);
}
