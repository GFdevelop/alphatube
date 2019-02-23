const express = require('express');
	cors = require('cors');				//~ Module required for Cross-Origin-Resource-Sharing policy
	path = require('path');
	jsonDB = require('node-json-db');	//~ Module that implements a json based database
	port = 8000;
	twitter = require('twit');
var process = require('process');
	bodyParser = require('body-parser');
	atlas = express();

// Fix path
process.env.PWD = path.join(path.dirname(process.argv[1]), '..');
process.chdir(process.env.PWD);
__dirname = process.env.PWD;
__filename = process.argv[1];


// CORS
var whitelist = ['site1826', 'gabriele.fulgaro', 'mattia.polverini', 'arianna.avoni', 'francesco.fornari2'];
for (i in whitelist) {
	whitelist[i] = 'http://' + whitelist[i] + '.tw.cs.unibo.it'
}
whitelist.push('http://localhost:8000');
whitelist.push(undefined);		// in localhost the origin is undefined

var corsOption = {
	methods: ['GET','PUT'],
	allowedHeaders: ['Content-Type'],
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
atlas.use(bodyParser.urlencoded({ extended: false }));
atlas.use(bodyParser.json());
atlas.use(express.static('alphatube'));


//~ JSON-DB - Initialization procedure
//~ If db file is present, conect to it else create it.
//~ The db purpouse is to track videos watched by the individual user
var db = new jsonDB("./db", true, true);


//~ Each time the server is started, it tries to read the value of lastID.
//~ If the value is not present, it means this is the first time the server is up
//~ so it creates the lastID field in the db and assign the value 0 to it.
// ~ try {
	// ~ var lastID = db.getData("/lastID");		//~ Used to store lastID assigned value
// ~ } catch(error) {
	// ~ lastID = 0;
	// ~ db.push("/lastID", lastID);				// save lastID to read on restart
// ~ };

// ~ atlas.options('*',cors(corsOption));

//~ Routes management
atlas.get('/globpop', function(req, res) {
	if (req.query.id) res.send(path);
	else res.send(__dirname);
});

//~ This routes assigns a unique ID for each visitor.
//~ This ID is stored in the client Local Storage and is used as key for the db.
// ~ atlas.get('/crazy', function(req, res) {
	// ~ try {
		// ~ var uid = db.getData("/" + req.query.user);
		// ~ uid = req.query.user;
	// ~ } catch(error) {
		// ~ lastID = lastID + 1;
		// ~ db.push("/" + lastID, {list: []});
		// ~ db.push("/lastID", lastID);
		// ~ uid = lastID;
	// ~ }
	// ~ res.json( { id: uid } );
// ~ });

atlas.put('/watched', (req, res) => {
	if (req.body.begin) {
		try {
			var timesWatched = db.getData(`/${req.body.begin}/related/${req.body.end}/${req.body.reason}`);
		} catch(error) {
			timesWatched = 0;
		}

		var value = {
			related: {
				[req.body.end]: {
					[req.body.reason]: timesWatched+1
				}
			}
		}

		db.push("/" + req.body.begin, value, false);
	}


	try {
		timesWatched = db.getData(`/${req.body.end}/timesWatched`);
	} catch(error) {
		timesWatched = 0;
	}

	value = {
		timesWatched: timesWatched+1,
		lastWatched: new Date().toUTCString()
	}

	db.push("/" + req.body.end, value, false);



	res.json( { message: 'OK' } );

		// ~ res.statusCode = 400;
		// ~ res.send('Bad Request');
});

atlas.get('/twitter', (req, res) => {
	
	var T = new twitter({
		consumer_key: '*************************',
		consumer_secret: '**************************************************',
		access_token: '**************************************************',
		access_token_secret: '*********************************************'
		
	});
	
	T.get('search/tweets', {
		q: req.query.q_song + ' ' + req.query.q_artist,
		lang: 'en',
		result_type: 'mixed',
		count: 24
	}, (err, data, response) => {
		res.send(data);
	});	
});

atlas.get('*', (req, res) => {
	res.sendFile(path.join(process.env.PWD, 'alphatube/index.html'));		// sendFile need absolute path
});

//~ Server bindings to port and listening
atlas.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
