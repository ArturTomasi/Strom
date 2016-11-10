/* global require, module, app */

var passport         = require( 'passport' ),
    mongoose         = require( 'mongoose' ),
    User             = mongoose.model( 'User' );
    LocalStrategy    = require('passport-local').Strategy;
    FacebookStrategy = require( 'passport-facebook' ).Strategy;

module.exports = function()
{
    passport.use( new FacebookStrategy
    ( {
        clientID: "334825226879943",
        clientSecret: "985475af65682a64c6af823d3e421f86",
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function( accessToken, refreshToken, profile, done )
      {
          var user = {};

          user.email   = profile._json.email;
          user.name    = profile._json.name;
          user.picture = profile._json.picture.data.url;
          user.role    = 'Operador';

          User.findOneAndUpdate( { email: user.email },
          {
              name: user.name,
              picture: user.picture
          },
          function (err, _user )
          {
              if ( _user ) return done( err, _user );

              User.create( user, function( error, _user )
              {
                  if ( error )
                  {
                      res.status( 500 ).json( composeError( error ) );
                  }

                  return done( err, _user );
              } );

          } );
      }
    ) );

    /**
     *
     */
    passport.use( new LocalStrategy
    (
        /**
         *
         * @param {type} login
         * @param {type} password
         * @param {type} done
         * @returns {undefined}
         */
        function( login, password, done )
        {
            User.findOne( { login: login }, function ( error, user )
            {
                if ( error )
                {
                    return done( error );
                }

                if ( ! user || user.password !== password )
                {
                    return done( 'Confirme o Login e/ou Senha', false);
                }

                return done( null, user );
            } );
        }
    ) );

    /**
     *
     */
    passport.serializeUser( function( user, done )
    {
        done( null, user._id );
    } );

    /**
     *
     */
    passport.deserializeUser( function( id, done )
    {
        User.findById( id ).exec( function ( error, user )
        {
            if ( error )
            {
                return done( error );
            }

            done( null, user );
        } );
    } );
};
