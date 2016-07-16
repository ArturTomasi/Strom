angular.module( "Strom" ).controller( "EntriesController", [ '$scope', '$location', function( $scope, $location )
{
	/**
	 * [show description]
	 * @param  {[type]} code [description]
	 * @return {[type]}      [description]
	 */
	$scope.show = function ( code ) 
	{
		switch ( code ) 
		{
		 	case 0:
		 		$location.path( '/user' );
	 		break;

	 		case 1:
		 		$location.path( '/entity' );
	 		break;
			
	 		case 2:
		 		$location.path( '/completionType' );
	 		break;

	 		case 3:
		 		$location.path( '/category' );
	 		break;
	 	}	 
	};

} ] );