/* global angular, Message */

angular.module( 'Strom' ).factory( 'CategoryService', [ '$q', '$http', function( $q, $http )  
{
    var CategoryService = {};
    
    /**
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    CategoryService.getCategories = function( callback )
    {
        var d = $q.defer();

        $http.get( '/categories' )
        
        .success( function( categories )
        {
            d.resolve( categories );

            eval( callback( categories ) );  
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
    CategoryService.getCategory = function( id, callback )
    {
        $http.get( '/categories/' + id )
        
        .success( function( category )
        {
            eval( callback( category ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );
    };
    
    /**
     * 
     * @param {type} category
     * @param {type} callback
     * @returns {undefined}
     */
    CategoryService.storeCategory = function( category, callback )
    {
        if ( ! category._id )
        {
            $http.post( '/categories/' , category )
            
            .success( function( category )
            {
                eval( callback( category ) );
            } )
            
            .error( function (error) 
            {
              Message.error( error );
            } );  
        }
        
        else
        {
            $http.put( '/categories/' , category )
            
            .success( function( category )
            {
                eval( callback( category ) );
            } )
            
            .error( function (error) 
            {
                Message.error( error );
            } );
        }
    };
    
    /**
     * 
     * @param {type} category
     * @param {type} callback
     * @returns {undefined}
     */
    CategoryService.deleteCategory = function( category, callback )
    {
        if( category )
        {
            $http.delete( '/categories/' + category._id )

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
    
    return CategoryService;
} ] );
    

