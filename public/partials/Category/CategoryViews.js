angular.module( 'Strom' )

.directive('categoryTable', [function () 
{
	var CategoryTable = {};
	
	CategoryTable.templateUrl = 'partials/Category/CategoryTable.html';

	return CategoryTable;
}])

.directive('categoryActions', [function () 
{
	var CategoryActions = {};
	
	CategoryActions.templateUrl = 'partials/Category/CategoryActions.html';

	return CategoryActions;
}])

.directive('categoryForm', [function () 
{
	var CategoryForm = {};
	
	CategoryForm.templateUrl = 'partials/Category/CategoryForm.html';

	return CompletionTypeForm;
}]);