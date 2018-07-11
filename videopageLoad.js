function videopageLoad(){
    $("body").html(`
	<nav class="navbar navbar-expand-md navbar-dark bg-primary" id="navbar">	<!-- WHATIS: with sticky-top the navbar scroll on viewport but stay fixed on top of its container if this not end -->
	</nav>
	<div class="collapse mt-3" id="Search">	<!-- TODO: collapse because on click we hide element -->
	</div>

	<!-- /navbar Gabriele -->

	<!-- francesco -->
	<div class="container-fluid pt-3"> <!-- TODO: fixare spacing destro --> <!-- FIXED by UniPolv -->
		<div class="row m-0">
				<div class="col-md-8 p-0 pr-md-3"id="tester">
					<div class="embed-responsive embed-responsive-16by9">
						<!-- video Francesco -->
						<div class="embed-responsive-item" id="player"></div>
					</div>
				</div>

			<!-- mattia -->
			<div class="col-md-4 mt-1 mt-md-0 pl-0 pr-0">
                <ul class="nav nav-tabs nav-justified" role="tablist" id="wiki-tab"> <!-- OK for large and very small screen, I don't like very much on medium screen -->
                    <li class="nav-item">
                        <a class="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="nav-description" aria-selected="true"><i class="fab fa-youtube yt"></i>description</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="comment-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="nav-comments" aria-selected="false"><i class="fab fa-youtube yt"></i>comments</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="artist-tab" data-toggle="tab" href="#artist" role="tab" aria-controls="nav-artist" aria-selected="false"><i class="fab fa-wikipedia-w"></i>Artist</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="disk-tab" data-toggle="tab" href="#disk" role="tab" aria-controls="nav-disk" aria-selected="false"><i class="fab fa-wikipedia-w"></i>Disk</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="genre-tab" data-toggle="tab" href="#genre" role="tab" aria-controls="nav-genre" aria-selected="false"><i class="fab fa-wikipedia-w"></i>Genre</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="spotify-tab" data-toggle="tab" href="#spotify" role="tab" aria-controls="nav-spotify" aria-selected="false"><i class="fab fa-spotify spotify" id="spotify-tab"></i>Spotify</a>
                    </li>
                </ul>
                <div class="tab-content" id="wiki-tab">
                    <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">Lorem</div>
                    <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comment-tab">Ipsum</div>
                    <div class="tab-pane fade" id="artist" role="tabpanel" aria-labelledby="artist-tab">Dolor</div>
                    <div class="tab-pane fade" id="disk" role="tabpanel" aria-labelledby="disk-tab">Sit</div>
                    <div class="tab-pane fade" id="genre" role="tabpanel" aria-labelledby="genre-tab">Amet</div>
                    <div class="tab-pane fade" id="spotify" role="tabpanel" aria-labelledby="spotify-tab">consectetuer</div>
                </div>

            </div>

			<!-- /mattia -->
		</div>

		<!-- recommender Francesco -->
		<div class="loader"></div>

	</div>
	<!-- /francesco -->
	<footer>
	</footer>`);
}