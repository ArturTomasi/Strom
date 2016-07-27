(function () {

	'use strict';

 	angular.module('Strom').directive( 'mytext', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/directives/html/mytext.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '=',
				minlength: '@',
				required: '@'
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
			}
		};
	
	}]);

})();