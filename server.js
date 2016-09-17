var http = require( 'http' );

var app = require( './config/express' )();

var db = require( './config/database.js' );

var config = require( 'node-ini' );

config.parse( './config/db.ini', function( error, config )
{
    if ( ! error )
    {
        db( config.type     + '://' +
            config.user     + ':'   +
            config.password + '@' +
            config.host     + ':' +
            config.port     + '/' + 
            config.name 
          );
    }
} );

require( './config/passport' )();

http.createServer( app ).listen( app.get( 'port' ), function()
{
	console.log( 'Express Server executando na porta ' + app.get( 'port' ) );
} ); 
