/* global angular, Message */

angular.module("Strom").controller( "UserController",['$scope','UserService', function ($scope, UserService )
{
    $scope.userSelected;
    $scope.users;

    /**
     * [sort description]
     * @param  {[type]} keyname [description]
     * @return {[type]}         [description]
     */
    $scope.sort = function( keyname )
    {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    /**
     * [selectUser description]
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
    $scope.selectUser = function (user)
    {
        $scope.userSelected = user;
    };
    
    /**
     * [getUserForm description]
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
    $scope.getUserForm = function ( user )
    {
        var _user = {};

        if( user )
        {
            _user = angular.copy( user );
        }

        else
        {
            _user.state = 0;
        }
        
        return _user;
    };
    
    /**
     * [storeUser description]
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
    $scope.storeUser = function(user)
    {
        UserService.storeUser( user, function( data )
        {
            $( '#store' ).modal( 'hide' );
                
                $scope.selectUser( data );
                loadUsers();
        } );
    };

    /**
     * [deleteUser description]
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
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
      
    /**
     * [loadUsers description]
     * @return {[type]} [description]
     */
    loadUsers = function()
    {
        UserService.getUsers( function( data )
        {
            $scope.users = data;
        } );
    };
    
    loadUsers();
} ]);