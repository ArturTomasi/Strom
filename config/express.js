var express        = require( 'express' ),
    load           = require( 'express-load' ),
    bodyParser     = require( 'body-parser' ),
    methodOverride = require( 'method-override' ),
    session        = require( 'express-session' ),
    cookieParser   = require( 'cookie-parser' ),
    passport       = require( 'passport' );

module.exports = function()
{
	var app = express();

	app.set( 'port', 8080 );
	app.use( express.static( './public' ) );	
	
	app.set( 'view engine', 'ejs' );
	app.set( 'views', './app/views' );
	
	app.use( bodyParser.urlencoded( { extended: true } ) );
	app.use( bodyParser.json() );
	app.use( methodOverride() );
	app.use( cookieParser() );
	app.use( session({secret: 'homemavestruz', resave: true, saveUninitialized: true } ) );
	app.use( passport.initialize() );
	app.use( passport.session() );

	load( 'models' , { cwd : 'app' } )
	  .then( 'controllers' )
	  .then( 'routes' )
	  .into( app );

	return app;
}
