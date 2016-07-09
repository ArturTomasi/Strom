angular.module( 'Strom' )

.directive('entityTable', [function () 
{
	var EntityTable = {};
	
	EntityTable.restrict = "E";

	EntityTable.templateUrl = 'partials/Entity/EntityTable.html';

	return EntityTable;
}] )

.directive('entityActions', [function () 
{
	var EntityActions = {};
	
	EntityActions.restrict = "E";
	
	EntityActions.templateUrl = 'partials/Entity/EntityActions.html';

	EntityActions.link =  function( $scope, $element, $attrs, ngModelCtrl )
	{
		$scope.isVisible = function ( mode )
		{
			return $element.attr( 'mode' ) === mode;	
		};
	};

	return EntityActions;
}] )

.directive('entityForm', [function () 
{
	var EntityForm = {};
	
	EntityForm.restrict = "E";

	EntityForm.templateUrl = 'partials/Entity/EntityForm.html';

	return EntityForm;
}] );