(function () {

	'use strict';

 	angular.module('Strom').directive( 'mycheckbox', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/directives/html/mycheckbox.html' ,
			scope : {
				label: '@',
				name:  '@',
				size:  '@',
				model: '='
			}
		};
	
	}]);

})();