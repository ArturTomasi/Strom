(function () {

	'use strict';

 	angular.module('Strom').directive( 'mytabcontent', [function () {
		return {
	      require: '^mytabs',
	      restrict: 'E',
	      transclude: true,
	      scope: { title: '@' },
	      link: function(scope, element, attrs, tabsCtrl) {
	        tabsCtrl.addPane(scope);
	      },
	      templateUrl: 'directives/html/mytabcontent.html',
	      replace: true
	    };
	}]);
})();

