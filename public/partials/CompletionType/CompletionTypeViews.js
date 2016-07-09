angular.module( 'Strom' )

.directive('completionTypeTable', [function () 
{
	var CompletionTypeTable = {};
	
	CompletionTypeTable.templateUrl = 'partials/CompletionType/CompletionTypeTable.html';

	return CompletionTypeTable;
}])

.directive('completionTypeActions', [function () 
{
	var CompletionTypeActions = {};
	
	CompletionTypeActions.templateUrl = 'partials/CompletionType/CompletionTypeActions.html';

	return CompletionTypeActions;
}])

.directive('completionTypeForm', [function () 
{
	var CompletionTypeForm = {};
	
	CompletionTypeForm.templateUrl = 'partials/CompletionType/CompletionTypeForm.html';

	return CompletionTypeForm;
}]);