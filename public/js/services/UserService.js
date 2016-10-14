/* global angular, Message */

angular.module( 'Strom' ).factory( 'UserService', [ '$q', '$http', function( $q, $http ) 
{
    var UserService = {};
    
    /**
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    UserService.getUsers = function( callback )
    {
        var d = $q.defer();

        $http.get( '/users' )
        
        .success( function( users )
        {
            d.resolve( users );

            eval( callback( users ) );  
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
    UserService.getUser = function( id, callback )
    {
        $http.get( '/users/' + id )
        
        .success( function( user )
        {
            eval( callback( user ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );
    };
    
    /**
     * 
     * @param {type} user
     * @param {type} callback
     * @returns {undefined}
     */
    UserService.storeUser = function( user, callback )
    {
        if ( ! user._id )
        {
            $http.post( '/users/' , user )
            
            .success( function( data )
            {
                eval( callback( data ) );
            } )
            
            .error( function (error) 
            {
              Message.error( error );
            } );  
        }
        
        else
        {
            $http.put( '/users/' , user )
            
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
    
    /**
     * 
     * @param {type} user
     * @param {type} callback
     * @returns {undefined}
     */
    UserService.deleteUser = function( user, callback )
    {
        if( user )
        {
            $http.delete( '/users/' + user._id )

            .success( function( user )
            {
                eval( callback( user ) );
            } )

            .error( function (error) 
            {
                Message.error( error );
            } );
        }
    };
    
    return UserService;
} ] );
    

