const express = require('express');
	cors = require('cors');	// for cross origin resource sharing request
	path = require('path');
	jsonDB = require('node-json-db');
var process = require('process');
const port = 8000;
var atlas = express();

// Fix path
process.env.PWD = path.join(path.dirname(process.argv[1]), '..');
process.chdir(process.env.PWD);



// CORS
var whitelist = ['site1826', 'gabriele.fulgaro', 'mattia.polverini', 'arianna.avoni', 'francesco.fornari2'];
for (i in whitelist) {
	whitelist[i] = 'http://' + whitelist[i] + '.tw.cs.unibo.it'
}
whitelist.push(undefined);

var corsOption = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionSuccessStatus: 200 //Legacy browser (IE 11) support
}

atlas.use(cors(corsOption));
atlas.use(express.static('alphatube'));


//JSON-DB
var db = new jsonDB("./db", true, true);

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
atlas.options('*', cors(corsOption));

atlas.get('/globpop', function(req, res) {
	if (req.query.id) res.send(path);
	else res.send(__dirname);
});

atlas.get('/crazy', function(req, res) {
	try {
		var uid = db.getData("/" + req.query.user);
		uid = req.query.user;
	} catch(error) {
		lastID = lastID + 1;
		db.push("/" + lastID, {list: []});
		db.push("/lastID", lastID);
		uid = lastID;
	}
	res.json({ id: uid });
});

atlas.get('*', (req, res) => {
  res.sendFile(path.join(process.env.PWD, 'alphatube/index.html'));
});


//START
atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
