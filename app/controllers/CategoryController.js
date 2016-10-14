/* global module */

module.exports = function ( app ) 
{
    var Category = app.models.Category;
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
    controller.getCategories = function( req, res )
    {
        Category.find().exec( function ( error , categories )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }
            
            res.json( categories );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.getCategory = function( req, res )
    {
        var id = sanitize( req.params.id );

        Category.findById( { _id : id } ).exec( function ( error, category )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( category );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.addCategory = function( req , res )
    {
        Category.create( req.body, function( error, category )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }
            
            res.json( category );
            
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.editCategory = function( req , res )
    {
        var _id = sanitize( req.body._id );

        Category.findOneAndUpdate( { _id : _id }, req.body, 
                               { new : true, runValidators: true, context: 'query' } ).exec( function ( error, category )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.status( 200 ).json( category );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.deleteCategory = function( req , res )
    {
        if ( req.params.id )
        {
            var _id = sanitize( req.params.id );
        
            //User.remove( { _id : _id } ).exec( function ( error, user )
        

            Category.findOneAndUpdate( { _id : _id }, { state: 1 }, 
                                   { new : true, runValidators: true, context: 'query' } ).exec( function ( error, category )
            {
                if ( error )
                {
                    res.status( 500 ).json( composeError( error ) );
                }
                
                res.status( 200 ).json( category );
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
        console.log( errors );

        var msg = '';
        
        for ( var e in errors.errors )
        {
            var error =  errors.errors[e];
            
            switch ( error.path )
            {
                case 'name':
                    msg +=  '\n' + 'Nome (' + error.value + ') ' +  error.message;
                break;
                
                case 'type':
                    msg +=  '\n' + 'Tipo (' + error.value + ') ' +  error.message;
                break;
            }
        }
        
        return msg;
    };
    
    return controller;
};

