var http = require( 'http' ),
	server = http.createServer( handleRequest ),
	Brain = require( 'brain' ),
	brain = new Brain.NeuralNetwork(),
	trainingData = [],
	trainingResult;

for ( var i = 0; i < 1000; i++ ) {
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

function getDateObject( d ) {
	return {
		day: d.getDate() / 31,
		weekday: d.getDay() / 7,
		month: d.getMonth() / 12
	};
}

function handleRequest( request, response ) {
	console.log( request.url )
	var dateStr = request.url.replace( "/", "" ),
		d = new Date( dateStr ),
		weekend = brain.run( getDateObject( d ) ),
		json = {
			weekend: weekend,
			date: getDateObject( d )
		};

	response.end( JSON.stringify( json ) );
}

server.listen( 8080, function () {
	//Callback triggered when server is successfully listening. Hurray!
	console.log( "Server listening on: http://localhost:8080" );
} );