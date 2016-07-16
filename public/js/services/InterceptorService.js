/* global angular */

angular.module( 'Strom' ).factory( 'InterceptorService', [ '$location', '$q', function( $location, $q )
{
    var Interceptor = {};

    Interceptor.responseError = function ( res )
    {
        if ( res.status == 401 )
        {
            $location.path( '/login' );
        }
        
        return $q.reject( res );
    };
    
    return Interceptor;
} ] );

