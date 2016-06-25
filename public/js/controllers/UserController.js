angular.module("Strom").controller("UserController", function ($scope, $resource )
{
    var UserController = $resource( 'users/:id' );
    
    $scope.userSelected;
    $scope.users;

    $scope.addUser = function (user)
    {
        user._id = $scope.users.length + 1;

        $scope.users.push(angular.copy(user));

        delete $scope.user;
    };

    $scope.selectUser = function (user)
    {
        $scope.userSelected = user;
    };
    
    $scope.editUser = function (user)
    {
        $scope.userSelected = user;
    };

    $scope.deleteUser = function (user) 
    {
        UserController.delete( { id: user._id }, loadUsers, function (error){ console.log(error);} );
        
    };
    
    function loadUsers()
    {
        UserController.query( function( users )
        {
            $scope.users = users;  
        }, function (error){ console.log(error);} );
    };
    
    $scope.init = function()
    {
        loadUsers();
    };

    $scope.init();
} );