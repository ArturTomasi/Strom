angular.module( "Strom" ).controller( "CompletionTypeController", [ '$scope', 'CompletionTypeService', function( $scope, CompletionTypeService )
{
    $scope.completionTypeSelected;
    $scope.completionTypes;
    $scope.completionType;

    /**
     * [sort description]
     * @param  {[type]} keyname [description]
     * @return {[type]}         [description]
     */
    $scope.sort = function( keyname )
    {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    /**
     * [selectCompletionType description]
     * @param  {[type]} completionType [description]
     * @return {[type]}                [description]
     */
    $scope.selectCompletionType = function (completionType)
    {
        $scope.completionTypeSelected = completionType;
    };
    
    /**
     * [storeCompletionType description]
     * @param  {[type]} completionType [description]
     * @return {[type]}                [description]
     */
    $scope.getCompletionTypeForm = function ( completionType )
    {
        if( completionType )
        {
            return angular.copy( completionType );
        }
        
        return {};
    };
    
    /**
     * [storeCompletionType description]
     * @param  {[type]} completionType [description]
     * @return {[type]}                [description]
     */
    $scope.storeCompletionType = function(completionType)
    {
        CompletionTypeService.storeCompletionType( completionType, function( data )
        {
            $( '#store' ).modal( 'hide' );
                
                $scope.selectCompletionType( data );
                loadCompletionTypes();
        } );
    };

    /**
     * [deleteCompletionType description]
     * @param  {[type]} completionType [description]
     * @return {[type]}                [description]
     */
    $scope.deleteCompletionType = function(completionType)
    {
        Message.confirm( 'Você deseja realmente excluir o Tipo de Finalização ' + $scope.completionTypeSelected.name, function () 
        {
            CompletionTypeService.deleteCompletionType( completionType, function( data )
            {
                loadCompletionTypes();
                $scope.selectCompletionType( data );
            } );
        } );
    };

    /**
     * [loadCompletionTypes description]
     * @return {[type]} [description]
     */
    loadCompletionTypes = function()
    {
        CompletionTypeService.getCompletionTypes( function( data )
        {
            $scope.completionTypes = data;
        } );
    };
    
    loadCompletionTypes();
} ]);