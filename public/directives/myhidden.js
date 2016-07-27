(function () {

	'use strict';

 	angular.module('Strom').directive( 'myhidden', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/directives/html/myhidden.html' ,
			scope : {
				name: '@',
				model: '='
			}
		};
	
	}]);

})();