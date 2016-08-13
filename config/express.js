var express        = require( 'express' ),
    load           = require( 'express-load' ),
    bodyParser     = require( 'body-parser' ),
    methodOverride = require( 'method-override' ),
    helmet 		   = require( 'helmet' ),
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
	
	app.use( bodyParser.urlencoded( { extended: true, limit: '50mb' } ) );
	app.use( bodyParser.json( { limit: '50mb' } ) );
	app.use( methodOverride() );
	app.use( cookieParser() );
	app.use( session({secret: 'homemavestruz', resave: true, saveUninitialized: true } ) );
	app.use( passport.initialize() );
	app.use( helmet() );
	app.use( passport.session() );
	app.use( helmet.hidePoweredBy( { setTo: 'PHP 5.5.14' } ) );
	app.use( helmet.xssFilter() );
	app.disable( 'x-powered-by' );

	load( 'models' , { cwd : 'app' } )
	  .then( 'controllers' )
	  .then( 'routes' )
	  .into( app );

     app.get( '/*', function( req, res )
     {
    	res.render( '404' );
     } );


	return app;
}

