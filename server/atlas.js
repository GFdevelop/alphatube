const express = require('express');
	cors = require('cors');	// for cross origin resource sharing request
	path = require('path');
	jsonDB = require('node-json-db');
	fs = require('fs');
const port = 8000;
var atlas = express();

// ~ var origin = '*';

// ~ if (fs.existsSync('./.dockerenv')) {
	// ~ var origin = 'http://site1826.tw.cs.unibo.it';
	// ~ var origin = 'http://gabriele.fulgaro.tw.cs.unibo.it';
	// ~ var clientdir = '../alphatube';
	// ~ var serverdir = './webapp/server';
// ~ }
// ~ else {
	// ~ var origin = 'http://localhost:8000';
	// ~ var clientdir = '../dist/alphatube';
	// ~ var serverdir = './server';
// ~ }

// ~ var currentDir;
// ~ fs.readdir('./webapp', function(err, items) {
   	// ~ it = items;
// ~ });
	// ~ res.send(JSON.stringify(currentDir));		// put this in your method


// CORS
var corsOption = {
	origin: 'http://site1826.tw.cs.unibo.it',
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}

// ~ atlas.use(cors(corsOption));
atlas.use(cors());
atlas.use(express.static(path.join(__dirname, '../alphatube')));


//JSON-DB
var db = new jsonDB("./webapp/server/db", true, true);

var lastID;
try {
	lastID = db.getData("/lastID");
} catch(error) {
	lastID = 0;
	db.push("/lastID", lastID);
};

// ~ var user = {
	// ~ from: "video0",
	// ~ to: "video4",
	// ~ reason: "abc"
// ~ }
// ~ db.push("/3/list[]",user,true);


//ROUTE
// ~ atlas.options('*', cors(corsOption));
atlas.options('*', cors());

atlas.get('/globpop', function(req, res) {
	if (req.query.id) res.send(path);
	else res.send(__dirname);
});

atlas.get('/crazy', function(req, res) {
	try {
		var uid = db.getData("/" + req.query.user);
	} catch(error) {
		lastID = lastID + 1;
		db.push("/" + lastID, {list: []});
		db.push("/lastID", lastID);
		uid = lastID;
	}
	res.json({ id: uid });
});

atlas.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../alphatube/index.html'));
});


//START
atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
