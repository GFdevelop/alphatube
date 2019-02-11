const express = require('express');
const port = 8000;
var atlas = express();
	cors = require('cors');	// for cross origin resource sharing request
	path = require('path');
	global = path.join(__dirname, '../alphatube');	// TODO: remove dist

var corsOption = {
	origin: 'http://site1826.tw.cs.unibo.it',
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}

atlas.use(cors(corsOption));
atlas.use(express.static(global));

// ~ atlas.get('/', function(req, res) {
	// ~ var options = {
		// ~ root: global,
	// ~ };

	// ~ res.sendFile('/index.html', options);
// ~ });

atlas.get('*', (req, res) => {
  res.sendFile(path.join(global, 'index.html'));
});

atlas.get('/globpop', function(req, res) {
	if (req.query.id) res.send("hello");
	else res.send("world");
});

atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
