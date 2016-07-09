angular.module( 'Strom' )

.directive('categoryTable', [function () 
{
	var CategoryTable = {};
	
	CategoryTable.restrict = "E";

	CategoryTable.templateUrl = 'partials/Category/CategoryTable.html';

	return CategoryTable;
}])

.directive('categoryActions', [function () 
{
	var CategoryActions = {};
	
	CategoryActions.restrict = "E";

	CategoryActions.templateUrl = 'partials/Category/CategoryActions.html';

	CategoryActions.link =  function( $scope, $element, $attrs, ngModelCtrl )
	{
		$scope.isVisible = function ( mode )
		{
			return $element.attr( 'mode' ) === mode;	
		};
	};

	return CategoryActions;
}])

.directive('categoryForm', [function () 
{
	var CategoryForm = {};
	
	CategoryForm.restrict = "E";

	CategoryForm.templateUrl = 'partials/Category/CategoryForm.html';

	return CategoryForm;
}]);