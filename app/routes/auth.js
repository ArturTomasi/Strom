/* global module */

var passport = require( 'passport' );

module.exports = function ( app )
{
    app.post('/login', passport.authenticate('local', { successRedirect: '/#/posting'} ) );
    
    app.get('/logout', function( req, res )
    {
        req.logOut();   
        res.redirect( '/#/login' );
    } );
};
