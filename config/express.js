var express = require( 'express' );

var load = require( 'express-load' );

var home = require( '../app/routes/home.js' );

module.exports = function()
{
	var app = express();
	
	app.set( 'port', 8080 );

	app.use( express.static( './public' ) );	
	
	app.set( 'view engine', 'ejs' );

	app.set( 'views', './app/views' );

	home( app );

	return app;
}
