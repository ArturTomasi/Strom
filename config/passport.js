/* global require, module, app */

var passport      = require( 'passport' ),
    mongoose      = require( 'mongoose' ),
    User          = mongoose.model( 'User' );
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() 
{
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
                    return done( null, false, { message: 'Incorrect username or password.' } );
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