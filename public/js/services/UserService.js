/* global BootstrapDialog */

angular.module( 'Strom' ).factory( 'UserService', function( $http ) 
{
    var UserService = {};
    
    UserService.getUsers = function( callback )
    {
        $http.get( '/users' )
        
        .success( function( users )
        {
            eval( callback( users ) );  
        } )
        
        .error( function (error) 
        {
            console.log(error);
        } );
    };
    
    UserService.getUser = function( id, callback )
    {
        $http.get( '/users/' + id )
        
        .success( function( user )
        {
            eval( callback( user ) );  
        } )
        
        .error( function (error) 
        {
            console.log(error);
        } );
    };
    
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
              Prompts.alert( error.errors );
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
                Prompts.alert( error.errors );
            } );
            
        }
    };
    
    UserService.deleteUser = function( user, callback )
    {
        if( user )
        {
            $http.delete( '/users/' + user._id )

            .success( function()
            {
                eval( callback() );
            } )

            .error( function (error) 
            {
                
            } );
        }
    };
    
    return UserService;
} );
    

