/* global module */

module.exports = function ( app ) 
{
    var Posting = app.models.Posting;
    var sanitize = require( 'mongo-sanitize' );
    
    /**
     * @type type
     */
    var controller = {};
    
    var MODE_NEW    = 0;
    var MODE_EDIT   = 1;
    var MODE_FINISH = 2;

   /**
    * 
    * @param {type} req
    * @param {type} res
    * @returns {undefined}
    */
    controller.getPostings = function( req, res )
    {
        Posting.find().exec( function ( error , postings )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }
            
            res.json( postings );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.getPosting = function( req, res )
    {
        var id = sanitize( req.params.id );

        Posting.findById( { _id : id } ).exec( function ( error, posting )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( posting );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.addPosting = function( req , res )
    {
        var posting = req.body;

        var errors = validate( posting, MODE_NEW );

        if ( ! errors )
        {
            Posting.create( posting, function( error, posting )
            {
                if ( error )
                {
                    res.status( 500 ).json( error );
                }
                
                res.json( posting );
                
            } );
        }

        res.status( 500 ).json( errors );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.editPosting = function( req , res )
    {
        var _id = sanitize( req.body._id );

        Posting.findOneAndUpdate( { _id : _id }, req.body, 
                               { new : true, runValidators: true, context: 'query' } ).exec( function ( error, posting )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.status( 200 ).json( posting );
        } );
    };
    
    /**
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.deletePosting = function( req , res )
    {
        if ( req.params.id )
        {
            var _id = sanitize( req.params.id );
        
            Posting.findOneAndUpdate( { _id : _id },
                                      { state: Posting.STATE_DELETE }, 
                                      { new : true, runValidators: true, context: 'query' } ).exec( function ( error, posting )
            {
                if ( error )
                {
                    res.status( 500 ).json( composeError( error ) );
                }
                
                res.status( 200 ).json( posting );
            } );
        }
    };
    

    /**
     * [validate description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validate( posting, mode )
    {
        var errors = '';

        var notFinish = mode != MODE_FINISH;

        if( notFinish && ! posting.estimateDate )
            errors += "A data estimada não pode estar vazia !<br>";

        if( notFinish && ! posting.estimateValue )
            errors += "O valor estimado está inválido !<br>";

        if( ! posting.name )
            errors += "O Nome não pode estar vazio!";

        if( ( posting.completionAuto || ! notFinish ) && ! posting.completionType )
            errors += "O tipo de finalização não pode estar vazio!<br>";

        if( ! posting.realDate && ! posting.completionType )
            errors += "O tipo de finalização não pode estar vazio<br>";

        if( notFinish && ! posting.entity )
            errors += "A empresa do lançamento não pode estar vazio!<br>";

        if( notFinish && ! posting.user )
            errors += "A responsável do lançamento não de estar vazio!<br>";

        if( notFinish && ! posting.category )
            errors += "A categoria do lançamento não pode estar vazio!<br>";

        if( ! notFinish && ! posting.realValue  )
            erros += "O valor real não pode estar vazia!<br>";

        if( ! notFinish && ! posting.realDate )
            errors += "A data real não pode estar vazia!<br>";

        if( notFinish && posting.realDate && ! posting.realValue )
            errors += "A valor real não pode ser 0!<br>";

        if( notFinish && posting.realValue && ! posting.realDate )
            errors += "A data real não pode estar vazia<br>!";

        if ( errors ) return errors;

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
            }
        }
        
        return msg;
    };
    
    return controller;
};

