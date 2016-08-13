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
            var _posting = angular.copy( posting );

            _posting.user     = $scope.getUser( _posting.user );
            _posting.entity   = $scope.getEntity( _posting.entity );
            _posting.category = $scope.getCategory( _posting.category );

            return _posting;
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
     * [getIcon description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.getIcon = function( posting )
    {
        switch( posting.state )
        {
            case 0: return 'new.png';
            case 1: return 'play.png';
            case 2: return 'finish.png';
            case 3: return 'delete.png';
        }
    };

    /**
     * [getUserName description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getUserName = function( id )
    {
        return $scope.getUser( id ).name;
    };

    /**
     * [getUser description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getUser = function( id )
    {
        return $scope.users.filter( function ( user ) 
        {
            return user._id === id;
        } )[0];
    };

    /**
     * [getCategoryName description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getCategoryName = function( id )
    {
        return $scope.getCategory( id ).name;
    };

    /**
     * [getCategory description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getCategory = function( id )
    {
        return $scope.categories.filter( function ( category ) 
        {
            return category._id === id;
        } )[0];
    };

    /**
     * [getEntityName description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getEntityName = function( id )
    {
        return $scope.getEntity( id ).name;
    };

    /**
     * [getEntity description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getEntity = function( id )
    {
        return $scope.entities.filter( function ( entity ) 
        {
            return entity._id === id;
        } )[0];
    };

    /**
     * [showCompletionType description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.showCompletionType = function ( posting ) 
    {
        if( posting )
        {
            return  posting.realDate ||
                    posting.realValue ||
                    posting.completionType;
        }

        return false;
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