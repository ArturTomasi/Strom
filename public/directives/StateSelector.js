angular.module( 'Strom' ).directive( 'stateSelector', [ function () 
{

	var StateSelector = {};

	StateSelector.restrict = 'E';

	StateSelector.require = 'ngModel';

	StateSelector.scope = 
	{
		size: '@'
	};

	StateSelector.templateUrl = 'directives/html/StateSelector.html';

	StateSelector.link = function ( scope, iElement, iAttrs, iCtrl )
	{
		scope.items = [ { id: 1, name: "Ativo" }, { id: 0, name: "Inativo" } ];
		
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