/* global angular */

( function(){
	
	'use strict';

	angular.module( 'Strom' , ['ngRoute', 'ngResource' ] );

	angular.module( 'Strom').config( [ '$routeProvider' , function ( $routeProvider ) 
	{
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

		$routeProvider.otherwise( { redirectTo: '/login' } );
	}]);
    
        angular.module( "Strom" ).controller( "ApplicationController", function ( $scope )
        {
            $scope.app = "Strom";
            $scope.currentUser = "Artur Tomasi";
            
            $scope.signIn = function( user )
            {
                window.location = '#/user';
            };
        } );
})();