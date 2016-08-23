angular.module( "Strom" ).factory( "FilterService", [ '$http', function( $http )
{
	var _TYPES = 
	{
		POSTING: 	0,
		USER: 		1,
		CATEGORY: 	2,
		COMPLETION: 3,
		ENTITY: 	4
	};

	var FilterService = {};

	FilterService.getFilters = function( type, callback )
	{
		switch ( type )
		{
			case _TYPES.POSTING:
				return FilterService.getPostingFilter( callback );
			
		}
	};


	FilterService.getPostingFilter = function( callback )
	{
		$http.get( "/filters/" + _TYPES.POSTING )

		.success( function( filters )
		{
			console.log( "filters" );
			
			eval( callback( filters ) );
		} )

		.error( function( error )
		{
			Message.error( error );
		} );
	};

	return FilterService;

} ] );