angular.module( 'Strom' )

.directive('postingTable', [function () 
{
	var PostingTable = {};
	
	PostingTable.restrict = 'E';

	PostingTable.templateUrl = 'partials/Posting/PostingTable.html';

	return PostingTable;
}] )

.directive('postingActions', [function () 
{
	var PostingActions = {};
	
	PostingActions.restrict = 'E';

	PostingActions.templateUrl = 'partials/Posting/PostingActions.html';
	
	PostingActions.link =  function( $scope, $element, $attrs, ngModelCtrl )
	{
		$scope.isVisible = function ( mode )
		{
			return $element.attr( 'mode' ) === mode;	
		};
	};

	return PostingActions;
}] )

.directive('postingForm', [function () 
{
	var PostingForm = {};
	
	PostingForm.restrict = 'E';

	PostingForm.templateUrl = 'partials/Posting/PostingForm.html';

	return PostingForm;
}] )

.directive( 'postingFilter', [ function () 
{
	var PostingFilter = {};

	PostingFilter.restrict = 'E';

	PostingFilter.replace = true;

	PostingFilter.templateUrl = 'directives/html/FilterEditor.html'; 

	PostingFilter.link = function( $scope, $element, $attrs )
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
	            { name: "users", label: "Usuários", type: "list", items : $scope.users }
	        ];
		};	

		loadFilters();
	};

	return PostingFilter;
}]);
