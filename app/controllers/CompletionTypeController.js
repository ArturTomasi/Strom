/* global module */

module.exports = function ( app ) 
{
    var CompletionType = app.models.CompletionType;
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
    controller.getCompletionTypes = function( req, res )
    {
        CompletionType.find().exec( function ( error , completionTypes )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }
            
            res.json( completionTypes );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.getCompletionType = function( req, res )
    {
        var id = sanitize( req.params.id );

        CompletionType.findById( { _id : id } ).exec( function ( error, completionType )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( completionType );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.addCompletionType = function( req , res )
    {
        CompletionType.create( req.body, function( error, completionType )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }
            
            res.json( completionType );
            
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.editCompletionType = function( req , res )
    {
        var _id = sanitize( req.body._id );

        CompletionType.findOneAndUpdate( { _id : _id }, req.body, 
                               { new : true, runValidators: true, context: 'query' } ).exec( function ( error, completionType )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.status( 200 ).json( completionType );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.deleteCompletionType = function( req , res )
    {
        if ( req.params.id )
        {
            var _id = sanitize( req.params.id );
        
            //User.remove( { _id : _id } ).exec( function ( error, user )
        

            CompletionType.findOneAndUpdate( { _id : _id }, { state: 1 }, 
                                   { new : true, runValidators: true, context: 'query' } ).exec( function ( error, completionType )
            {
                if ( error )
                {
                    res.status( 500 ).json( composeError( error ) );
                }
                
                res.status( 200 ).json( completionType );
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

                case 'phone':
                    msg +=  '<br>' + 'Telefone (' + error.value + ') ' +  error.message;
                break;
            }
        }
        
        return msg;
    };
    
    return controller;
};

