/* global angular */

( function(){
	
    'use strict';

    angular.module( 'Strom' , [ 'ngRoute', 
                                'ngResource',
                                'angularUtils.directives.dirPagination' ] );

    angular.module( 'Strom').config( [ '$routeProvider', '$httpProvider' , function ( $routeProvider, $httpProvider ) 
    {
        $httpProvider.interceptors.push( 'InterceptorService' );
        
        $routeProvider
        
        .when('/user', 
        {
            templateUrl: '/partials/User/User.html',
            controller: 'UserController'
        } )
        
        .when('/category', 
        {
            templateUrl: '/partials/Category/Category.html',
            controller: 'CategoryController'
        } )
        
        .when('/entity', 
        {
            templateUrl: '/partials/Entity/Entity.html',
            controller: 'EntityController'
        } )
        
        .when('/completionType', 
        {
            templateUrl: '/partials/CompletionType/CompletionType.html',
            controller: 'CompletionTypeController'
        } )
        
        .when('/entries', 
        {
            templateUrl: '/partials/Lists/EntrieList.html',
            controller: 'EntriesController'
        } );
        
        $routeProvider.otherwise( { redirectTo: '/' } );
    } ] );
})();