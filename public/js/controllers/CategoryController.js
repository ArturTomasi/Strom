angular.module("Strom").controller( "CategoryController",['$scope','CategoryService', function ($scope, CategoryService )
{
    $scope.categorySelected;
    $scope.categories;

    $scope.sort = function( keyname )
    {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    $scope.selectCategory = function (category)
    {
        $scope.categorySelected = category;
    };
    
    $scope.getCategoryForm = function ( category )
    {
        if( category )
        {
            return angular.copy( category );
        }
        
        return {};
    };
    
    $scope.storeCategory = function(category)
    {
        CategoryService.storeCategory( category, function( data )
        {
            $( '#store' ).modal( 'hide' );
                
                $scope.selectCategory( data );
                loadCategories();
        } );
    };
    
    $scope.deleteCategory = function(category)
    {
        Message.confirm( 'Você deseja realmente excluir o usuário ' + $scope.categorySelected.name, function () 
        {
            CategoryService.deleteCategory( category, function()
            {
                loadCategories();
            } );
        } );
    };
      
    loadCategories = function()
    {
        CategoryService.getCategories( function( data )
        {
            $scope.categories = data;
        } );
    };
    
    loadCategories();
} ]);