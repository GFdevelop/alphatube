const express = require('express');
	//~ Module required for Cross-Origin-Resource-Sharing policy
	cors = require('cors');	
	path = require('path');
	//~ Module that implements a json based database
	jsonDB = require('node-json-db');
	port = 8000;

var atlas = express();

//~ Used to store lastID assigned value
var lastID;

//~ Server setup
atlas.use(cors());
atlas.use(express.static(path.join(__dirname, '../alphatube')));
atlas.options('*', cors());


//~ JSON-DB - Initialization procedure 
//~ If db file is present, conect to it else create it.
//~ The db purpouse is to track videos watched by the individual user
var db = new jsonDB("./webapp/server/db", true, true);

//~ Each time the server is started, it tries to read the value of lastID.
//~ If the value is not present, it means this is the first time the server is up
//~ so it creates the lastID field in the db and assign the value 0 to it.
try {
	lastID = db.getData("/lastID");
} catch(error) {
	lastID = 0;
	db.push("/lastID", lastID);
};


//~ Routes management
atlas.get('/globpop', function(req, res) {
	if (req.query.id) res.send(path);
	else res.send(__dirname);
});

//~ This routes assingns a unique ID for each visitor.
//~ This ID is stored in the client Local Storage and is used as key for the db.
atlas.get('/crazy', function(req, res) {
	try {
		var uid = db.getData("/" + req.query.user);
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
  res.sendFile(path.join(__dirname, '../alphatube/index.html'));
});


//~ Server bindings to port and listening
atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
