/* global angular, Message */

angular.module( 'Strom' ).factory( 'EntityService', [ '$q', '$http', function( $q, $http ) 
{
    var EntityService = {};
    
    /**
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    EntityService.getEntities = function( callback )
    {
        var d = $q.defer();

        $http.get( '/entities' )
        
        .success( function( entities )
        {
            d.resolve( entities );

            eval( callback( entities ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );

        return d.promise;
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
              Message.error( error );
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
                Message.error( error );
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

            .success( function( data )
            {
                eval( callback( data ) );
            } )

            .error( function (error) 
            {
                Message.error( error );
            } );
        }
    };

    return EntityService;
} ] );

