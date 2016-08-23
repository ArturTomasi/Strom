angular.module( 'Strom' ).directive( 'filterEditor', [ 'FilterService', function ( FilterService ) 
{
	var _TYPES = 
    {
        POSTING:    0,
        USER:       1,
        CATEGORY:   2,
        COMPLETION: 3,
        ENTITY:     4
    };

	var FilterEditor = {};

	FilterEditor.restrict = 'E';

	FilterEditor.replace = true;

	FilterEditor.templateUrl = 'directives/html/FilterEditor.html';

	FilterEditor.scope = 
	{
		model : "=",
		type  : "=",
		filterAction: "&"
	};

	FilterEditor.link = function ( $scope, $element, $attrs, $model )
	{
		$scope.filters = [];
		
		$scope.selectItem = function ( item ) 
		{
        	$scope.filters.push( angular.copy( item ) );

        	$scope.close();
        };

		$scope.close = function () 
		{
            $( '#newFilter' ).modal( 'hide' );
		};

		loadFilters = function()
		{
			FilterService.getFilters( $scope.type, function( items )
			{
				$scope.items = items;
			} );
		};

		loadFilters();
	};


	return FilterEditor;

} ] );