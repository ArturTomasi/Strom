angular.module( "Strom" ).controller( "EntityController", [ '$scope', 'EntityService', function( $scope, EntityService )
{
    $scope.entitySelected;
    $scope.entities;
    $scope.entity;

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
     * [selectentity description]
     * @param  {[type]} entity [description]
     * @return {[type]}                [description]
     */
    $scope.selectEntity = function (entity)
    {
        $scope.entitySelected = entity;
    };
    
    /**
     * [storeentity description]
     * @param  {[type]} entity [description]
     * @return {[type]}                [description]
     */
    $scope.getEntityForm = function ( entity )
    {
        if( entity )
        {
            return angular.copy( entity );
        }
        
        return {};
    };
    
    /**
     * [storeEntity description]
     * @param  {[type]} entity [description]
     * @return {[type]}                [description]
     */
    $scope.storeEntity = function(entity)
    {
        EntityService.storeEntity( entity, function( data )
        {
            $( '#store' ).modal( 'hide' );
                
                $scope.selectEntity( data );
                loadEntity();
        } );
    };

    /**
     * [deleteEntity description]
     * @param  {[type]} entity [description]
     * @return {[type]}                [description]
     */
    $scope.deleteEntity = function(entity)
    {
        Message.confirm( 'Você deseja realmente excluir o Tipo de Finalização ' + $scope.entitySelected.name, function () 
        {
            EntityService.deleteEntity( entity, function( data )
            {
                loadEntity();
                $scope.selectEntity( data );
            } );
        } );
    };

    /**
     * [loadEntity description]
     * @return {[type]} [description]
     */
    loadEntity = function()
    {
        EntityService.getEntities( function( data )
        {
            $scope.entities = data;
        } );
    };
    
    loadEntity();
} ]);