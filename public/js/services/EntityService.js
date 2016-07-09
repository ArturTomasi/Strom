/* global angular, Message */

angular.module( 'Strom' ).factory( 'EntityService', [ '$http', function( $http ) 
{
    var EntityService = {};
    
    /**
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    EntityService.getEntities = function( callback )
    {
        $http.get( '/entities' )
        
        .success( function( entities )
        {
            eval( callback( entities ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );
    };
    
    /**
     * 
     * @param {type} id
     * @param {type} callback
     * @returns {undefined}
     */
    EntityService.getEntity = function( id, callback )
    {
        $http.get( '/entities/' + id )
        
        .success( function( entity )
        {
            eval( callback( entity ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );
    };
    
    /**
     * 
     * @param {type} entity
     * @param {type} callback
     * @returns {undefined}
     */
    EntityService.storeEntity = function( entity, callback )
    {
        if ( ! entity._id )
        {
            $http.post( '/entities/' , entity )
            
            .success( function( entity )
            {
                eval( callback( entity ) );
            } )
            
            .error( function (error) 
            {
              Message.alert( error );
            } );  
        }
        
        else
        {
            $http.put( '/entities/' , entity )
            
            .success( function( entity )
            {
                eval( callback( entity ) );
            } )
            
            .error( function (error) 
            {
                Message.alert( error );
            } );
        }
    };
    
    /**
     * 
     * @param {type} entity
     * @param {type} callback
     * @returns {undefined}
     */
    EntityService.deleteEntity = function( entity, callback )
    {
        if( entity )
        {
            $http.delete( '/entities/' + entity._id )

            .success( function()
            {
                eval( callback() );
            } )

            .error( function (error) 
            {
                Message.error( error );
            } );
        }
    };

    return EntityService;
} ] );

