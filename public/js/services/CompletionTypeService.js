/* global angular, Message */

angular.module( 'Strom' ).factory( 'CompletionTypeService', [ '$q', '$http', function( $q, $http ) 
{
    var CompletionTypeService = {};
    
    /**
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    CompletionTypeService.getCompletionTypes = function( callback )
    {
        var d = $q.defer();

        $http.get( '/completionTypes' )
        
        .success( function( completionTypes )
        {
            d.resolve( completionTypes );

            eval( callback( completionTypes ) );  
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
    CompletionTypeService.getCompletionType = function( id, callback )
    {
        $http.get( '/completionTypes/' + id )
        
        .success( function( completionType )
        {
            eval( callback( completionType ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );
    };
    
    /**
     * 
     * @param {type} completionType
     * @param {type} callback
     * @returns {undefined}
     */
    CompletionTypeService.storeCompletionType = function( completionType, callback )
    {
        if ( ! completionType._id )
        {
            $http.post( '/completionTypes/' , completionType )
            
            .success( function( completionType )
            {
                eval( callback( completionType ) );
            } )
            
            .error( function (error) 
            {
              Message.error( error );
            } );  
        }
        
        else
        {
            $http.put( '/completionTypes/' , completionType )
            
            .success( function( completionType )
            {
                eval( callback( completionType ) );
            } )
            
            .error( function (error) 
            {
                Message.error( error );
            } );
        }
    };
    
    /**
     * 
     * @param {type} completionType
     * @param {type} callback
     * @returns {undefined}
     */
    CompletionTypeService.deleteCompletionType = function( completionType, callback )
    {
        if( completionType )
        {
            $http.delete( '/completionTypes/' + completionType._id )

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

    return CompletionTypeService;
} ] );
    

