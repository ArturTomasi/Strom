/* global module, process */

var mongoose = require( 'mongoose' );

var connection;

module.exports = function( uri )
{
    connection =  mongoose.connect( uri, { server: {poolSize: 15} } );

    mongoose.connection.on( 'connected', function()
    {
        console.log( 'MongoDB Connectado !!' );
    });

    mongoose.connection.on( 'disconnected', function()
    {
        console.log( 'MongoDB Desconnectado !!' );
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
