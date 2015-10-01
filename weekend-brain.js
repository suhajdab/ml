var http = require( 'http' ),
	server = http.createServer( handleRequest ),
	Brain = require( 'brain' ),
	brain = new Brain.NeuralNetwork(),
	trainingSize = 10000,
	trainingData = [],
	trainingResult;

// train by generating random dates
for ( var i = 0; i < trainingSize; i++ ) {
	var year = Math.ceil( Math.random() * 2000 ),
		month = Math.ceil( Math.random() * 11 ),
		day = Math.ceil( Math.random() * 31 ),
		d = new Date( year + '-' + month + '-' + day ),
		input = getDateObject( d ),
		output = {
			weekend: (d.getDay() == 0 || d.getDay() == 6) ? 1 : 0
		};

	trainingData.push( { input: input, output: output } );
}

trainingResult = brain.train( trainingData );
console.log( trainingData, trainingResult );

function parseUrl( url ) {
	var dateStr = url.replace( "/", "" );
	return new Date( dateStr );
}

function getDateObject( d ) {
	return {
		day: d.getDate() / 100,
		weekday: d.getDay() / 10,
		month: d.getMonth() / 100,
		year: d.getFullYear() / 10000
	};
}


function handleRequest( request, response ) {
	var date = parseUrl( request.url ),
		formatted = getDateObject( date ),
		weekend = brain.run( formatted ),
		json = {
			weekend: weekend,
			date: getDateObject( date )
		};

	response.end( JSON.stringify( json ) );
}

server.listen( 8080, function () {
	//Callback triggered when server is successfully listening. Hurray!
	console.log( "Server listening on: http://localhost:8080" );
} );