/* global angular, Message */

angular.module("Strom").controller( "UserController",['$scope','UserService', function ($scope, UserService )
{
    $scope.userSelected;
    $scope.users;

    $scope.sort = function( keyname )
    {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

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
        Message.confirm( 'Você deseja realmente excluir o usuário ' + $scope.userSelected.name, function () 
        {
            UserService.deleteUser( user, function( data )
            {
                loadUsers();
                $scope.selectUser( data );
            } );
        } );
    };
      
    loadUsers = function()
    {
        UserService.getUsers( function( data )
        {
            $scope.users = data;
        } );
    };
    
    loadUsers();
} ]);