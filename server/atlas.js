const express = require('express');
	cors = require('cors');	// for cross origin resource sharing request
	path = require('path');
	jsonDB = require('node-json-db');
const port = 8000;
var atlas = express();


// CORS
var corsOption = {
	origin: 'http://site1826.tw.cs.unibo.it',
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}

atlas.use(cors(corsOption));
atlas.use(express.static(path.join(__dirname, '../alphatube')));


//JSON-DB
var db = new jsonDB("./webapp/server/db", true, true);

try {
    var data = db.getData("/lastID");
} catch(error) {
	db.push("/lastID", 0);
};

// ~ var user = {
	// ~ from: "video0",
	// ~ to: "video4",
	// ~ reason: "abc"
// ~ }
// ~ db.push("/3/list[]",user,true);


//ROUTE
atlas.get('/globpop', function(req, res) {
	if (req.query.id) res.send(path);
	else res.send(__dirname);
});

atlas.get('/crazy', function(req, res) {
	try {
		var uid = db.getData("/" + req.query.id);
	} catch(error) {
		data = data + 1;
		db.push("/" + data + "/", {list: []});
		db.push("/lastID", data);
		uid = data;
	}
	res.send(uid.toString());
});

atlas.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../alphatube/index.html'));
});


//START
atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
