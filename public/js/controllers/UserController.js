/* global angular */

angular.module("Strom").controller( "UserController",['$scope','UserService', function ($scope, UserService )
{
    $scope.userSelected;
    $scope.users;

    $scope.selectUser = function (user)
    {
        $scope.userSelected = user;
    };
    
    $scope.getUserForm = function ( user )
    {
        if( user )
        {
            return angular.copy( user );
        }
        
        return {};
    };
    
    $scope.storeUser = function(user)
    {
        UserService.storeUser( user, function( data )
        {
            $( '#store' ).modal( 'hide' );
            
            $scope.selectUser( data );
            loadUsers();
        } );
    };
    
    $scope.deleteUser = function(user)
    {
        UserService.deleteUser( user, function()
        {
            loadUsers();
        } );
    };
    
    loadUsers = function()
    {
        UserService.getUsers( function( data )
        {
            $scope.users = data;
        } );
    };
    
    init = function()
    {
        loadUsers();
    };

    init();
} ]);