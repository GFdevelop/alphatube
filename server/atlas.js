const express = require('express');
	//~ Module required for Cross-Origin-Resource-Sharing policy
	cors = require('cors');
	path = require('path');
	//~ Module that implements a json based database
	jsonDB = require('node-json-db');
	port = 8000;
var process = require('process');
	atlas = express();


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


//~ Server setup
atlas.use(cors(corsOption));
atlas.use(express.static('alphatube'));


//~ JSON-DB - Initialization procedure
//~ If db file is present, conect to it else create it.
//~ The db purpouse is to track videos watched by the individual user
var db = new jsonDB("./db", true, true);


//~ Each time the server is started, it tries to read the value of lastID.
//~ If the value is not present, it means this is the first time the server is up
//~ so it creates the lastID field in the db and assign the value 0 to it.
try {
	var lastID = db.getData("/lastID");		//~ Used to store lastID assigned value
} catch(error) {
	lastID = 0;
	db.push("/lastID", lastID);
};

//~ Routes management
atlas.options('*', cors(corsOption));

atlas.get('/globpop', function(req, res) {
	if (req.query.id) res.send(path);
	else res.send(__dirname);
});

//~ This routes assingns a unique ID for each visitor.
//~ This ID is stored in the client Local Storage and is used as key for the db.
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
	res.json(
		{
			id: uid
		}
	);
});

atlas.get('*', (req, res) => {
  res.sendFile(path.join(process.env.PWD, 'alphatube/index.html'));
});


//~ Server bindings to port and listening
atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
