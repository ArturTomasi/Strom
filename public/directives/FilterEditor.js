angular.module( 'Strom' ).directive( 'filterEditor', [ function () 
{
	var FilterEditor = {};

	FilterEditor.restrict = 'E';

	FilterEditor.replace = true;

	FilterEditor.templateUrl = 'directives/html/FilterEditor.html';

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

			$scope.items = 
	        [
	            { name: "name", label: "Nome", type: "input" },
	            { name: "state", label: "Situação", type: "list", items:  [ { name: "Registrado",   id: 0 }, { name: "Em Andamento", id: 1 }, { name: "Finalizado",   id: 2 }, { name: "Deletado",     id: 3 } ] },
	            { name: "estimateDate", label: "Data Estimada", type: "date" },
	            { name: "users", label: "Usuários", type: "list", items :  $scope.users }
	        ];
		};	

		loadFilters();
	};


	return FilterEditor;

} ] );