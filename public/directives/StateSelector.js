angular.module( 'Strom' ).directive( 'stateSelector', [ function () 
{

	var StateSelector = {};

	StateSelector.restrict = 'E';

	StateSelector.require = 'ngModel';

	StateSelector.scope = 
	{
		isPosting: '@',
		size: '@'
	};

	StateSelector.templateUrl = 'directives/html/StateSelector.html';

	StateSelector.link = function ( scope, iElement, iAttrs, iCtrl )
	{
	 	iElement.bind('change', function()
	 	{
	 		iCtrl.$setViewValue( scope.state );
            iCtrl.$render();
	 	} );
		
		iCtrl.$parsers.push( function ( data )
		{
		 	return scope.state;
		} );
		
		iCtrl.$formatters.push( function( viewValue )
		{
			if ( viewValue )
			{
            	scope.state = String( viewValue );
			}
	    } );
	};
	
	return StateSelector;
} ] );