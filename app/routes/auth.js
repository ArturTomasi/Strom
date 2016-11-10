/* global module */

var passport = require( 'passport' );

module.exports = function ( app )
{
    app.get('/auth/facebook', passport.authenticate( 'facebook', { scope: [ 'email' ] } ) );

    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' } ),
    function( req, res )
    {
        res.redirect( "/" );
    } );

    app.post( '/login', passport.authenticate('local' ), function( req, res )
  	{
  		  res.json( cloneUser( req.user ) );
  	} );

    app.post( '/logout', function( req, res )
    {
        req.logOut();

        res.status( 200 ).json( {} );
    } );

    app.get( '/active-user', function( req, res )
    {
        res.json( cloneUser( req.user ) );
    } );

    function cloneUser( user )
    {
      var _user = {};

      _user.name = user.name;
      _user.role = user.role;
      
      return _user;
    }
};
