const express = require('express');
var atlas = express();
	cors = require('cors');
	path = require('path');
	global = path.join(__dirname, '/dist/alphatube');

var corsOption = {
	origin: 'http://site1826.tw.cs.unibo.it',
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}

atlas.use(cors(corsOption));
atlas.use(express.static(path.join(__dirname, '/dist/alphatube')));

atlas.get('/', function(req, res) {
	var options = {
		root: global,
	};
	
	res.sendFile('/index.html', options);
});

atlas.listen(8080, () => {
  console.log('Server started!');
});
