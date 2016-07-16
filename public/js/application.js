/* global angular */

( function(){
	
    'use strict';
    
    angular.module( 'Strom' , [ 'ngRoute', 
                                'ngResource',
                                'angularUtils.directives.dirPagination',
                                'ui.utils.masks'] );

    angular.module( 'Strom').config( [ '$routeProvider', '$httpProvider' , function ( $routeProvider, $httpProvider ) 
    {
        $httpProvider.interceptors.push( 'InterceptorService' );
        
        $routeProvider
        
        .when('/home', 
        {
            templateUrl: '/partials/Home/Home.html',
            controller: 'HomeCtrl'
        } )

        .when('/analysis',
        {
            templateUrl: 'partials/Analysis/Analysis.html',
            controller: 'AnalysisCtrl'
        } )

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

        .when('/posting', 
        {
            templateUrl: '/partials/Posting/Posting.html',
            controller: 'PostingController'
        } )
        
        .when('/reports', 
        {
            templateUrl: '/partials/Lists/ReportList.html',
            controller: 'ReportController'
        } )
        
        .when('/entries', 
        {
            templateUrl: '/partials/Lists/EntrieList.html',
            controller: 'EntriesController'
        } )

        .when('/reportPosting', 
        {
            templateUrl: '/partials/Reports/ReportPosting.html',
            controller: 'PostingController'
        } )

        .when('/reportUser', 
        {
            templateUrl: '/partials/Reports/ReportUser.html',
            controller: 'UserController'
        } )

        .when('/reportEntity', 
        {
            templateUrl: '/partials/Reports/ReportEntity.html',
            controller: 'EntityController'
        } ) 

        .when('/reportCompletionType', 
        {
            templateUrl: '/partials/Reports/ReportCompletionType.html',
            controller: 'CompletionTypeController'
        } )     
        
        .when('/reportCategory', 
        {
            templateUrl: '/partials/Reports/ReportCategory.html',
            controller: 'CategoryController'
        } );
            
        
        $routeProvider.otherwise( { redirectTo: '/home' } );
    } ] );
})();