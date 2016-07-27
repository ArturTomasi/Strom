(function () {

	'use strict';

 	angular.module('Strom').directive( 'myform', [function () {
	
		return {
			restrict: 'E',
			templateUrl: '/directives/html/myform.html' ,
			transclude: true,
			scope: {
				formname: '@',
				funcsubmit: '&'
			}
		};
	
	}]);

})();