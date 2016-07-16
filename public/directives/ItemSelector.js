angular.module( 'Strom' ).directive( 'itemSelector', [ function () 
{
	var ItemSelector = {};

	ItemSelector.restrict = 'E';

	ItemSelector.require = 'ngModel';
	
	ItemSelector.scope = 
	{ 
		items: '=',
		title: '@',
		name:  '@',
		size:  '@'
	};

	ItemSelector.templateUrl = 'directives/html/ItemSelector.html';

	ItemSelector.link = function ( $scope, $element, $attr, $controller ) 
	{
		$scope.title= 'Item Selector';
		
		$scope.itemSelected;

		$scope.selectItem = function ( item ) 
		{
			 $scope.itemSelected = item;

			 $scope.close();
		};

		$scope.clearItem = function () 
		{
			 $scope.itemSelected = undefined;
		};

		$scope.close = function () 
		{
			 $( '#choice' + $scope.name ).modal( 'hide' );
		};

		$element.bind('change', function()
	 	{
	 		$controller.$setViewValue( $scope.itemSelected );
            $controller.$render();
	 	} );
		
		$controller.$parsers.push( function ( data )
		{
		 	return $scope.itemSelected;
		} );
		
		$controller.$formatters.push( function( viewValue )
		{
			if ( viewValue )
			{
            	$scope.itemSelected = String( viewValue );
			}
	    } );
	};

	return ItemSelector;

} ] ); 