const express = require('express');
const port = 8000;
var atlas = express();
	cors = require('cors');
	path = require('path');
	global = path.join(__dirname, '/dist/alphatube');

var corsOption = {
	origin: 'http://site1826.tw.cs.unibo.it',
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}

atlas.use(cors(corsOption));
atlas.use(express.static(path.join(__dirname, '/alphatube')));

atlas.get('/', function(req, res) {
	var options = {
		root: global,
	};
	
	res.sendFile('/index.html', options);
});

atlas.get('/globpop?id=/{[a-z]|[A-Z]|[0-9]|_}$', function(req, res) {
	res.send("Hello");
	console.log("Ciao");
});

atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
