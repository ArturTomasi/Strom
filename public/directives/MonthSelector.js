angular.module( 'Strom' ).directive( 'monthSelector', [ function () 
{
	var MonthSelector = {};

	MonthSelector.restrict = 'E';

	MonthSelector.templateUrl = 'directives/html/MonthSelector.html';
	
	MonthSelector.scope = 
	{
		id : '@',
		model: "="
	};

	MonthSelector.link = function( $scope, $element, $attrs, ngModelCtrl  )
	{
		setTimeout( function() 
        {
        	var element = $( '#_' + $scope.id );
			
			element.attr( 'disabled', 'true' );

        	var config = {};

        	config.OnAfterChooseMonth = function( selectedDate )
		 	{
		 		$scope.model = selectedDate;

				$scope.$apply();
			};

			if ( $scope.model )
			{
				config.SelectedMonth = $scope.model.getMonth() + 1 + '/' + $scope.model.getFullYear();
			}

			element.MonthPicker( config );
      
        }, 500 );
	};
	 
	return MonthSelector;
} ] );