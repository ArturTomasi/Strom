/* global module */

module.exports = function ( app ) 
{
    var User = app.models.User;
    
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
        User.findById( { _id : req.params.id } ).exec( function ( error, user )
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
        User.findOneAndUpdate( { _id : req.body._id }, req.body, { new : true } ).exec( function ( error, user )
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
            var _id = req.params.id;
        
            User.remove( { _id : _id } ).exec( function ( error, user )
            {
                if ( error )
                {
                    res.status( 500 ).json( composeError( error ) );
                }
                
                res.status( 200 ).json( user );
            } );
        }
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
                    msg +=  '<br>' + 'Nome (' + error.value + ') ' +  error.message;
                break;
                
                case 'email':
                    msg +=  '<br>' + 'Email (' + error.value + ') ' +  error.message;
                break;
                
                case 'login':
                    msg +=  '<br>' + 'Login (' + error.value + ') ' +  error.message;
                break;
            }
        }
        
        return msg;
    };
    
    return controller;
};

