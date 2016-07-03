/* global angular */

( function(){
	
    'use strict';

    angular.module( 'Strom' , ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination' ] );

    angular.module( 'Strom').config( [ '$routeProvider', '$httpProvider' , function ( $routeProvider, $httpProvider ) 
    {
        $httpProvider.interceptors.push( 'InterceptorService' );
        
        $routeProvider.when('/user', 
        {
            templateUrl: 'partials/user/user.html',
            controller: 'UserController'
        } )
        .when('/login', 
        {
            templateUrl: '/partials/login.html',
            controller: 'ApplicationController'
        });

        $routeProvider.otherwise( { redirectTo: '/user' } );
    } ] );
})();