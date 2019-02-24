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
whitelist.push('http://localhost:8000');	// TODO: remove this
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

// ~ atlas.options('*',cors(corsOption));

//~ Routes management
atlas.get('/globpop', cors(), function(req, res) {

	// ~ console.log(req.protocol + '://' + req.headers.host);
	var response = {
		site: req.headers.host,
		recommender: req.query.id,
		lastWatched: 'Never watched.',
		recommended: []
	}

	if (req.query.id) {
		try {
			var video = db.getData(`/${req.query.id}`);

			if (video) {
				response.lastWatched = video.lastWatched;
				response.recommended = Object.entries(video.recommended).map(
					([k, v]) => (
						{
							videoId: k,
							prevalentReason: Object.keys(v)[0],
							timesWatched: Object.values(v)[0].timesWatched,
							lastSelected: Object.values(v)[0].lastSelected
						}
					)
				);
				// ~ console.log(response);
			}
		} catch(error) {
			res.statusCode = 404;
		}
	}
	// ~ else {

	// ~ }
	res.json( response );
});

atlas.put('/watched', (req, res) => {

	const date = new Date().toUTCString();

	// CURRENT VIDEO
	try {
		var timesWatched = db.getData(`/${req.body.end}/timesWatched`);
	} catch(error) {
		timesWatched = 0;
	}

	var current = {
		timesWatched: timesWatched+1,
		lastWatched: date,
		recommended: []
	}

	db.push("/" + req.body.end, current, false);



	// OLD VIDEO RELATION
	if (req.body.begin && req.body.reason) {
		try {
			var oldVideo = db.getData(`/${req.body.begin}`);

			var noReason = {
				prevalentReason: req.body.reason,
				timesSelected: 1
			}

			var noVideo = {
				videoId: req.body.end,
				totalSelected: 1,
				lastSelected: date,
				from: [
					noReason
				]
			}

			var newVideoIndex = oldVideo.recommended.findIndex(id => id.videoId == req.body.end);
			if (newVideoIndex < 0) oldVideo.recommended.push(noVideo);
			else {
				var newVideo = (oldVideo.recommended[newVideoIndex]);
				newVideo.totalSelected += 1;
				newVideo.lastSelected = date;


				var reasonIndex = newVideo.from.findIndex(reason => reason.prevalentReason == req.body.reason);
				if (reasonIndex < 0) newVideo.from.push(noReason);
				else newVideo.from[reasonIndex].timesSelected += 1;

				newVideo.from.sort((a, b) => (a.timesSelected < b.timesSelected) ? 1 : -1);			// sort reason array
				oldVideo.recommended.sort((a, b) => (a.lastSelected < b.lastSelected) ? 1 : -1);	// sort video array
			}
		} catch(error) {
			res.statusCode = 404;
			res.send('Not found');
		} finally {
			db.push(`/${req.body.begin}`, oldVideo, true);
		}
	}


	// OLD INSERT
	// ~ if (req.body.begin) {
		// ~ try {
			// ~ var timesWatched = db.getData(`/${req.body.begin}/recommended/${req.body.end}/${req.body.reason}`);
		// ~ } catch(error) {
			// ~ timesWatched = 0;
		// ~ }

		// ~ var value = {
			// ~ recommended: {
				// ~ [req.body.end]: {
					// ~ [req.body.reason]: {
						// ~ timesWatched: timesWatched+1,
						// ~ lastSelected: date
					// ~ }
				// ~ }
			// ~ }
		// ~ }

		// ~ db.push("/" + req.body.begin, value, false);
	// ~ }
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
