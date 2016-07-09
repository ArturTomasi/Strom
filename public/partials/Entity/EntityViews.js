angular.module( 'Strom' )

.directive('entityTable', [function () 
{
	var EntityTable = {};
	
	EntityTable.templateUrl = 'partials/Entity/EntityTable.html';

	return EntityTable;
}])

.directive('entityActions', [function () 
{
	var EntityActions = {};
	
	EntityActions.templateUrl = 'partials/Entity/EntityActions.html';

	return EntityActions;
}])

.directive('entityForm', [function () 
{
	var EntityForm = {};
	
	EntityForm.templateUrl = 'partials/Entity/EntityForm.html';

	return EntityForm;
}]);