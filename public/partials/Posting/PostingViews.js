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

.directive( 'postingFilter', [ 'UserService', 'CategoryService', 'EntityService', 'CompletionTypeService',
					 function ( UserService, CategoryService, EntityService, CompletionTypeService ) 
{
	var PostingFilter = {};

	PostingFilter.restrict = 'E';

	PostingFilter.replace = true;

	PostingFilter.scope = {
		method :'&'
	};

	PostingFilter.templateUrl = 'directives/html/FilterEditor.html'; 

	PostingFilter.link = function( $scope, $element, $attrs )
	{
		$scope.filters = [];
		
		/**
		 * [delete description]
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.delete = function()
		{
			$scope.filters = $scope.filters.filter( function( filter ) 
			{
				return ! filter.selected;
			} );		
		};

		/**
		 * [addItem description]
		 * @param {[type]} item [description]
		 */
		$scope.addItem = function ( item ) 
		{
			$scope.filters.push( angular.copy( item ) );

        	$scope.close();
        };

        /**
         * [validFilter description]
         * @return {[type]} [description]
         */
        $scope.validFilter = function ()
        {
        	var error = $scope.filters.filter( function( filter ) 
			{
				if ( filter.type === 'date' ) return ! filter.value.from || ! filter.value.until;
				
				return ! filter.value;

			} );

			if ( error.length )
			{
				Message.alert( "Preencha todos os campos do filtro" );
			}

			else 
			{

				var conditions = {};

				$scope.filters.forEach( function( filter )
				{
					//make filter for node
					var condition = conditions[ filter.name ]; 
					
					if ( ! condition ) condition = [];

					condition.push( filter.value );

					conditions[ filter.name ] = condition;
				} );
				
				$scope.method( { filter : conditions } );


				$( '#addFilter' ).modal( 'hide' );
			}
        };

        /**
         * [close description]
         * @return {[type]} [description]
         */
		$scope.close = function () 
		{
            $( '#newFilter' ).modal( 'hide' );
		};

		/**
		 * [loadFilters description]
		 * @return {[type]} [description]
		 */
		loadFilters = function()
		{
			$scope.items = 
	        [
	            { name: "name",          label: "Nome", 			   type: "input"  },
	            { name: "state",         label: "Situação", 		   type: "list",  items:  [ { name: "Registrado",   id: 0 }, { name: "Em Andamento", id: 1 }, { name: "Finalizado",   id: 2 }, { name: "Deletado",     id: 3 } ] },
	            { name: "estimateDate",  label: "Data Estimada",       type: "date"   },
	            { name: "realDate",      label: "Data Real", 	       type: "date"   },
	            { name: "realValue",     label: "Valor Real", 	       type: "number" },
	            { name: "estimateValue", label: "Valor Estimado",      type: "number" },
	            { name: "deadline",      label: "Dentro do Prazo",     type: "list",  items: [ { name : "Sim", id : 0 }, { name: "Não", id : 1 } ] },
	            { name: "inBudget",      label: "Dentro do Orçamento", type: "list",  items: [ { name : "Sim", id : 0 }, { name: "Não", id : 1 } ] },
	            { name: "type",      	 label: "Tipo", type: "list",  items: [ { name : "Receita", id : 'Receita' }, { name: "Despesa", id : 'Despesa' } ] }
	        ];

			UserService.getUsers( function( users )
			{
				$scope.items.push( { name: "user", label: "Usuário", type: "list", items : users } );
	        } );
			
		 	CompletionTypeService.getCompletionTypes( function( completions )
	        {
				$scope.items.push( { name: "completionType", label: "Finalização", type: "list", items : completions } );
	        } );

			CategoryService.getCategories( function( categories )
        	{
				$scope.items.push( { name: "category", label: "Categoria", type: "list", items : categories } );
	        } );
	        
	        EntityService.getEntities( function( entities )
	        {
	        	$scope.items.push( { name: "entity", label: "Entidade", type: "list", items : entities } );
        	} );
		};	

		loadFilters();
	};

	return PostingFilter;
} ] );
