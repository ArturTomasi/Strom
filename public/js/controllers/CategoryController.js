angular.module("Strom").controller( "CategoryController",['$scope','CategoryService', function ($scope, CategoryService )
{
    $scope.categorySelected;
    $scope.categories;
    
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
     * [selectCategory description]
     * @param  {[type]} category [description]
     * @return {[type]}          [description]
     */
    $scope.selectCategory = function (category)
    {
        $scope.categorySelected = category;
    };

    /**
     * [getCategoryForm description]
     * @param  {[type]} category [description]
     * @return {[type]}          [description]
     */
    $scope.getCategoryForm = function ( category )
    {
        var _category = {};

        if( category )
        {
            _category = angular.copy( category );
        }

        else
        {
            _category.state = 0;
        }
        
        return _category;
    };
    
    /**
     * [storeCategory description]
     * @param  {[type]} category [description]
     * @return {[type]}          [description]
     */
    $scope.storeCategory = function(category)
    {
        CategoryService.storeCategory( category, function( data )
        {
            $( '#store' ).modal( 'hide' );
                
                $scope.selectCategory( data );
                loadCategories();
        } );
    };

    /**
     * [deleteCategory description]
     * @param  {[type]} category [description]
     * @return {[type]}          [description]
     */
    $scope.deleteCategory = function(category)
    {
        Message.confirm( 'Você deseja realmente excluir o usuário ' + $scope.categorySelected.name, function () 
        {
            CategoryService.deleteCategory( category, function( data )
            {
                loadCategories();
                $scope.selectCategory( data );
            } );
        } );
    };

    /**
     * [loadCategories description]
     * @return {[type]} [description]
     */
    loadCategories = function()
    {
        CategoryService.getCategories( function( data )
        {
            $scope.categories = data;
        } );
    };
    
    loadCategories();
} ]);