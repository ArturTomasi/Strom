/* global module, process */

var mongoose = require( 'mongoose' );

mongoose.set( 'debug', true );

var connection;

module.exports = function( uri ) 
{
    console.log( uri );
    
    connection =  mongoose.connect( uri, { server: {poolSize: 15} } );

    mongoose.connection.on( 'connected', function()
    {
        console.log( 'MongoDB Connectado !!' );
    });

    mongoose.connection.on( 'disconnected', function()
    {
        console.log( 'MongoDB Desconnectado !!' );
    });

    mongoose.connection.on( 'error', function( error )
    {
        console.log( 'MongoDB Error:  ' + error + ' !!' );
    });

    process.on( 'SIGINT', function()
    {
          mongoose.connection.close( function ()
          {
              console.log( 'MongoDB Desconnectado !!' );
              process.exit( 0 ); 
          } );
    } );
};