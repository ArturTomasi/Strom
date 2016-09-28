var Posting = require( '../models/Posting.js' )();

var moment   = require( 'moment' );

function doWork()
{

	Posting.find( {} )
    
    .exec( function( error, data ) 
    {
    	console.log( data );
    } );

    setTimeout( function()
    {
    	console.log( "the end" );
    }, 500 )
}

doWork();