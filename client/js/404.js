function loader404(){ // TODO: deprecabile?
    $("body").html(`<div class="container-fluid">
		<h1 class="text-center text-light pt-5 font-weight-bold">404: Page Not Found</h1>
		<div class="text-center">
			 <img class= "img-fluid col-3 mt-2" src="media/Logo.png" alt= "Responsive Logo" >
		</div>
		<div class="row justify-content-center">
			<button onclick="window.location.href='./index.html'" type="button" class="btn btn-outline-light btn-lg font-weight-bold mt-2">Ritorna alla home</button>
		</div>
	</div>`);
}
