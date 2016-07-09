angular.module( "Strom" ).controller( "ReportController", [ '$scope', '$location', function( $scope, $location )
{
	$scope.show = function ( code ) 
	{
		switch ( code ) 
		{
		 	case 0:
		 		$location.path( '/reportPosting' );
	 		break;

	 		case 1:
		 		$location.path( '/reportUser' );
	 		break;
			
	 		case 2:
		 		$location.path( '/reportEntity' );
	 		break;

	 		case 3:
		 		$location.path( '/reportCompletionType' );
	 		break;

	 		case 4:
		 		$location.path( '/reportCategory' );
	 		break;
	 	}	 
	};

	$scope.printMonthly = function()
	{
		Message.info( 'Compre sua licença para este report' );
	}

} ] );