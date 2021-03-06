/* global module */

module.exports = function ( app )
{
    var User = app.models.User;
    var sanitize = require( 'mongo-sanitize' );

    /**
     * @type type
     */
    var controller = {};

   /**
    *
    * @param {type} req
    * @param {type} res
    * @returns {undefined}
    */
    controller.getUsers = function( req, res )
    {
       User.find().exec( function ( error , users )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( users );
        } );
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.getUser = function( req, res )
    {
        var id = sanitize( req.params.id );

        User.findById( { _id : id } ).exec( function ( error, user )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( user );
        } );
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.addUser = function( req , res )
    {
        User.create( req.body, function( error, user )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( user );

        } );
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.editUser = function( req , res )
    {
        var _id = sanitize( req.body._id );

        User.findOneAndUpdate( { _id : _id }, req.body,
                               { new : true, runValidators: true, context: 'query' } ).exec( function ( error, user )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.status( 200 ).json( user );
        } );
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.deleteUser = function( req , res )
    {
        if ( req.params.id )
        {
            var _id = sanitize( req.params.id );

            //User.remove( { _id : _id } ).exec( function ( error, user )


            User.findOneAndUpdate( { _id : _id }, { state: 1 },
                                   { new : true, runValidators: true, context: 'query' } ).exec( function ( error, user )
            {
                if ( error )
                {
                    res.status( 500 ).json( composeError( error ) );
                }

                res.status( 200 ).json( user );
            } );
        }
    };

    controller.getAnnotation = function( req, res )
    {
        var id = sanitize( req.user._id );

        User.findById( { _id : id } ).exec( function ( error, user )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( user.annotation );
        } );
    };

    controller.saveAnnotation = function( req, res )
    {
        var id = sanitize( req.user._id );

        User.findOneAndUpdate( { _id : id }, { annotation: req.body.annotation },
                               { new : true, runValidators: true, context: 'query' } ).exec( function ( error, user )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.status( 200 ).json( user.annotation );
        } );
    };

    /**
     *
     * @param {type} errors
     * @returns {unresolved}
     */
    function composeError( errors )
    {
        var msg = '';

        for ( var e in errors.errors )
        {
            var error =  errors.errors[e];

            switch ( error.path )
            {
                case 'name':
                    msg +=  '\n' + 'Nome (' + error.value + ') ' +  error.message;
                break;

                case 'email':
                    msg +=  '\n' + 'Email (' + error.value + ') ' +  error.message;
                break;

                case 'login':
                    msg +=  '\n' + 'Login (' + error.value + ') ' +  error.message;
                break;

                case 'phone':
                    msg +=  '\n' + 'Telefone (' + error.value + ') ' +  error.message;
                break;
            }
        }

        return msg;
    };

    return controller;
};
