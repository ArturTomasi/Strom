/* global module */

module.exports = function ( app ) 
{
    var Entity = app.models.Entity;
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
    controller.getEntities = function( req, res )
    {
        Entity.find().exec( function ( error , entity )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }
            
            res.json( entity );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.getEntity = function( req, res )
    {
        var id = sanitize( req.params.id );

        Entity.findById( { _id : id } ).exec( function ( error, entity )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( entity );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.addEntity = function( req , res )
    {
        Entity.create( req.body, function( error, entity )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }
            
            res.json( entity );
            
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.editEntity = function( req , res )
    {
        var _id = sanitize( req.body._id );

        Entity.findOneAndUpdate( { _id : _id }, req.body, 
                               { new : true, runValidators: true, context: 'query' } ).exec( function ( error, entity )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.status( 200 ).json( entity );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.deleteEntity = function( req , res )
    {
        if ( req.params.id )
        {
            var _id = sanitize( req.params.id );
        
            //User.remove( { _id : _id } ).exec( function ( error, user )
        

            Entity.findOneAndUpdate( { _id : _id }, { state: 1 }, 
                                   { new : true, runValidators: true, context: 'query' } ).exec( function ( error, entity )
            {
                if ( error )
                {
                    res.status( 500 ).json( composeError( error ) );
                }
                
                res.status( 200 ).json( entity );
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
                    msg +=  '\n' + 'Nome (' + error.value + ') ' +  error.message;
                break;
                
                case 'email':
                    msg +=  '\n' + 'Email (' + error.value + ') ' +  error.message;
                break;
                
                case 'phone':
                    msg +=  '\n' + 'Telefone (' + error.value + ') ' +  error.message;
                break;
            
                case 'cnpj':
                    msg +=  '\n' + 'CNPJ (' + error.value + ') ' +  error.message;
                break;
            }
        }
        
        return msg;
    };
    
    return controller;
};

