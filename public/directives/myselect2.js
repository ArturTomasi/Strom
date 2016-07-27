(function () {

	'use strict';

 	angular.module('Strom').directive( 'myselect2', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/directives/html/myselect2.html' ,
			scope : {
				data: '=',
				label: '@',
				name: '@',
				model: '=',
				required: '@',
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
				
				var myselect = $(element).find('select');
				
				myselect.select2({
					data: scope.data,
					placeholder: "Select a value",
					allowClear: true,
					minimumInputLength: 2
				});

				setTimeout(
					function () {
						if(scope.model)
						{
							$('[value="'+ scope.model +'"]').attr( 'selected' , 'selected' ).change();
						}
					}, 500 );
			}
		};
	
	}]);

})();