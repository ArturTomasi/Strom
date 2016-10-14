/* global angular */

angular.module( 'Strom' ).factory( 'InterceptorService', [ '$rootScope', '$location', '$q', function( $rootScope, $location, $q )
{
    var Interceptor = {};

    Interceptor.responseError = function ( res )
    {
        if ( res.status == 401 )
        {
            $location.path( '/#/home' );
        }
        
        return $q.reject( res );
    };

    Interceptor.request = function( req )
    {   
        if ( req.preload )
        {
            $( '#preload' ).show();
        }

        return req;
    };

    Interceptor.response = function( res )
    {
        $( '#preload' ).hide();

        return res;
    };
    
    return Interceptor;
} ] );
