angular.module( 'Strom' )

.directive('userTable', [function () 
{
	var UserTable = {};
	
	UserTable.templateUrl = 'partials/User/UserTable.html';

	return UserTable;
}])

.directive('userActions', [function () 
{
	var UserActions = {};
	
	UserActions.templateUrl = 'partials/User/UserActions.html';

	return UserActions;
}])

.directive('userForm', [function () 
{
	var UserForm = {};
	
	UserForm.templateUrl = 'partials/User/CategoryForm.html';

	return CompletionTypeForm;
}]);