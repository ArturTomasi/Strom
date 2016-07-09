angular.module( 'Strom' )

.directive('userTable', [function () 
{
	var UserTable = {};
	
	UserTable.restrict = 'E';

	UserTable.templateUrl = 'partials/User/UserTable.html';

	return UserTable;
}] )

.directive('userActions', [function () 
{
	var UserActions = {};
	
	UserActions.restrict = 'E';

	UserActions.templateUrl = 'partials/User/UserActions.html';
	
	UserActions.link =  function( $scope, $element, $attrs, ngModelCtrl )
	{
		$scope.isVisible = function ( mode )
		{
			return $element.attr( 'mode' ) === mode;	
		};
	};

	return UserActions;
}] )

.directive('userForm', [function () 
{
	var UserForm = {};
	
	UserForm.restrict = 'E';

	UserForm.templateUrl = 'partials/User/UserForm.html';

	return UserForm;
}] );