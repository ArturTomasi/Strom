(function () {

	'use strict';

 	angular.module('Strom').directive( 'mydate', [function () {
	
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/directives/html/mydate.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '=',
				disabled: '=',
				required: '@',
				mask: '@'
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
			}
		};
	
	}]);

	angular.module('Strom').filter( 'date', function () 
	{
    	return function ( date ) 
    	{	
    		if ( date )
    		{
	    		moment.locale( 'pt-br' );
	    		
	    		return moment( date ).format( 'L' );
    		}

    		return 'N/D';
    	};
    } );

})();