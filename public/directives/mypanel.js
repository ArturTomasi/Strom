(function () {

	'use strict';

 	angular.module('Strom').directive( 'mypanel', [function () {
		return {
			restrict: 'E',
			templateUrl: '/directives/html/mypanel.html' ,
			transclude: {
				'bodySlot'  : '?mypanelbody',
				'footerSlot': '?mypanelfooter'
			},
			scope: {
			 	title: '@'
			}
		};
	}]);
})();

