const express = require('express');
const port = 8000;
var atlas = express();
	cors = require('cors');
	path = require('path');

var corsOption = {
	origin: 'http://site1826.tw.cs.unibo.it',
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}

atlas.use(cors(corsOption));
atlas.use(express.static(path.join(__dirname, '../alphatube'));

atlas.get('*', (req, res) => {	
	res.sendFile(path.join(__dirname, '../alphatube/index.html'));
});

atlas.get('/globpop', function(req, res) {
	res.send("Hello");
	console.log("Ciao");
});

atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
