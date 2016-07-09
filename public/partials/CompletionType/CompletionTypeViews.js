angular.module( 'Strom' )

.directive('completionTypeTable', [function () 
{
	var CompletionTypeTable = {};
	
	CompletionTypeTable.restrict = "E";

	CompletionTypeTable.templateUrl = 'partials/CompletionType/CompletionTypeTable.html';

	return CompletionTypeTable;
}] )

.directive('completionTypeActions', [function () 
{
	var CompletionTypeActions = {};
	
	CompletionTypeActions.restrict = "E";

	CompletionTypeActions.templateUrl = 'partials/CompletionType/CompletionTypeActions.html';

	CompletionTypeActions.link =  function( $scope, $element, $attrs, ngModelCtrl )
	{
		$scope.isVisible = function ( mode )
		{
			return $element.attr( 'mode' ) === mode;	
		};
	};

	return CompletionTypeActions;
}] )

.directive('completionTypeForm', [function () 
{
	var CompletionTypeForm = {};

	CompletionTypeForm.restrict = "E";
	
	CompletionTypeForm.templateUrl = 'partials/CompletionType/CompletionTypeForm.html';

	return CompletionTypeForm;
}] );