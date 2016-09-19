/* global module */

var passport = require( 'passport' );

module.exports = function ( app )
{
    app.post( '/login', passport.authenticate('local' ), function( req, res ) 
	{
		res.json( req.user );
	} );
    
    app.post( '/logout', function( req, res )
    {
        req.logOut();   

        res.status( 200 ).json( {} );
    } );
};
