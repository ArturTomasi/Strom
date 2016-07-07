angular.module( "Strom" ).controller( "EntriesController", [ '$scope', '$location', function( $scope, $location )
{
	$scope.show = function ( code ) 
	{
		switch ( code ) 
		{
		 	case 0:
		 		$location.path( '/user' );
	 		break;

	 		case 1:
		 		$location.path( '/user' );
	 		break;
			
	 		case 2:
		 		$location.path( '/user' );
	 		break;

	 		case 3:
		 		$location.path( '/user' );
	 		break;
	 	}	 
	};

} ] );