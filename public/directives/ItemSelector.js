angular.module( 'Strom' ).directive( 'itemSelector', [ function () 
{
	var ItemSelector = {};

	ItemSelector.restrict = 'E';
	
	ItemSelector.scope = 
	{ 
		items: '=',
		disabled: '=',
        model: "=",
		title: '@',
		name:  '@',
		size:  '@',
		hidelabel: '='
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

		$scope.choice = function()
		{
			$scope.items = $scope.items.filter( function( it )
			{
				return ! it.state || it.state === 0;
			} );

			if ( ! $scope.disabled )
				$( '#choice' + $scope.name ).modal();
		};

		$scope.clearItem = function () 
		{
			if ( ! $scope.disabled )
			 	$scope.model = undefined;
		};

		$scope.close = function () 
		{
            $( '#choice' + $scope.name ).modal( 'hide' );
		};
	};

	return ItemSelector;

} ] ); 