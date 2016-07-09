/* global angular, Message */

angular.module( 'Strom' ).factory( 'CompletionTypeService', [ '$http', function( $http ) 
{
    var CompletionTypeService = {};
    
    /**
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    CompletionTypeService.getCompletionTypes = function( callback )
    {
        $http.get( '/completionTypes' )
        
        .success( function( completionTypes )
        {
            eval( callback( completionTypes ) );  
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
              Message.alert( error );
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
                Message.alert( error );
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

    return CompletionTypeService;
} ] );
    

