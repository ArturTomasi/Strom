angular.module( 'Strom' ).directive( 'itemSelector', [ function () 
{
	var ItemSelector = {};

	ItemSelector.restrict = 'E';
	
	ItemSelector.scope = 
	{ 
		items: '=',
        model: "=",
		title: '@',
		name:  '@',
		size:  '@'
	};

	ItemSelector.templateUrl = 'directives/html/ItemSelector.html';

	ItemSelector.link = function ( $scope, $element, $attr, $controller ) 
	{
		$scope.title= 'Item Selector';

		$scope.selectItem = function ( item ) 
		{
            $scope.model = item;

            $scope.close();
		};

		$scope.clearItem = function () 
		{
			 $scope.model = undefined;
		};

		$scope.close = function () 
		{
            $( '#choice' + $scope.name ).modal( 'hide' );
		};
	};

	return ItemSelector;

} ] ); 