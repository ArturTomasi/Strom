angular.module("Strom").controller( "UserController", function ($scope, UserService )
{
    $scope.userSelected;
    $scope.users;

    $scope.selectUser = function (user)
    {
        $scope.userSelected = user;
    };
    
    $scope.storeUser = function(user)
    {
        console.log( user );
        
        UserService.storeUser( user, function( data )
        {
            loadUsers();
            $scope.selectUser( data );
        } );
    };
    
    $scope.deleteUser = function(user)
    {
        UserService.deleteUser( user, function( data )
        {
            loadUsers();
            $scope.selectUser( data );
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
} );