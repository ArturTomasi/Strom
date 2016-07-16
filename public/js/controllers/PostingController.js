angular.module( 'Strom' ).controller( 'PostingController', [ '$scope', 'PostingService' , 'UserService', 'EntityService' , 'CategoryService' , 'CompletionTypeService',
												  function (  $scope ,  PostingService  ,  UserService ,  EntityService  ,  CategoryService  ,  CompletionTypeService ) 
{
 	$scope.postingSelected;
    $scope.postings;
    $scope.users;
    $scope.entities;
    $scope.completionTypes;
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
     * [selectPosting description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.selectPosting = function (posting)
    {
        $scope.postingSelected = posting;
    };
    
    /**
     * [getPostingForm description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.getPostingForm = function ( posting )
    {
        if( posting )
        {
            return angular.copy( posting );
        }
        
        return {};
    };
    
    /**
     * [storePosting description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.storePosting = function(posting)
    {
        PostingService.storePosting( posting, function( data )
        {
            $( '#store' ).modal( 'hide' );
                
            $scope.selectPosting( data );
            loadPostings();
        } );
    };
    
    /**
     * [deletePosting description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.deletePosting = function(posting)
    {
        Message.confirm( 'Você deseja realmente excluir o lançamento ' + $scope.postingSelected.name, function () 
        {
            PostingService.deletePosting( posting, function( data )
            {
                loadPostings();
                $scope.selectPosting( data );
            } );
        } );
    };
      
    /**
     * [loadPostings description]
     * @return {[type]} [description]
     */
    loadPostings = function()
    {
        PostingService.getPostings( function( data )
        {
            $scope.postings = data;
        } );
    };
    
    /**
     * [loadUsers description]
     * @return {[type]} [description]
     */
	loadUsers = function()
    {
        UserService.getUsers( function( data )
        {
            $scope.users = data;
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

    /**
     * [loadEntities description]
     * @return {[type]} [description]
     */
	loadEntities = function()
    {
        EntityService.getEntities( function( data )
        {
            $scope.entities = data;
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

    /**
     * [init description]
     * @return {[type]} [description]
     */
    function init()
    {
    	loadUsers();
    	loadCategories();
    	loadEntities();
    	loadCompletionTypes();
    	loadPostings();
    };

    init();

} ] );