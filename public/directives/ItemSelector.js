angular.module( 'Strom' ).directive( 'itemSelector', [ function () 
{
	var ItemSelector = {};

	ItemSelector.restrict = 'E';

	// ItemSelector.require = 'ngModel';
	
	ItemSelector.templateUrl = 'directives/html/ItemSelector.html';

	ItemSelector.link = function ( $scope, $element, $attr, $controller ) 
	{
			
	};

	return ItemSelector;

} ] ); 