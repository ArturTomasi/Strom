angular.module( 'Strom' ).controller( 'PostingController', [ '$scope', 'PostingService' , 'UserService', 'EntityService' , 'CategoryService' , 'CompletionTypeService',
												  function (  $scope ,  PostingService  ,  UserService ,  EntityService  ,  CategoryService  ,  CompletionTypeService ) 
{
    var Posting  = {
        STATE_REGISTRED : 0,
        STATE_PROGRESS  : 1,
        STATE_FINISHED  : 2,
        STATE_DELETED   : 3
    }; 

 	$scope.postingSelected;
    $scope.postings;
    $scope.users;
    $scope.entities;
    $scope.completionTypes;
    $scope.categories;
    $scope.isFinish = false;
    
    $scope.YesNoOptions =[ { name : 'Sim', value: true },
                           { name:  'Não', value: false } ];

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
            $scope.isFinish = false;

            var _posting = angular.copy( posting );

            _posting.user           = $scope.getUser( _posting.user );
            _posting.entity         = $scope.getEntity( _posting.entity );
            _posting.category       = $scope.getCategory( _posting.category );
            _posting.completionType = $scope.getCompletionType( _posting.completionType );
            _posting.completionAuto = $scope.YesNoOptions[ _posting.completionAuto ? 0 : 1 ];

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
     * [editPosting description]
     * @param  {[type]} $event  [description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.editPosting = function( $event, posting )
    {
        var errors = validateEdit( posting );

        if ( ! errors )
        {
            $scope.posting = $scope.getPostingForm( posting );
                   
            $( '#store' ).modal();
        }

        else
        {
            Message.alert( errors );
        }
    };

    /**
     * [deletePosting description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.deletePosting = function(posting)
    {
        var errors = validateDelete( posting );

        if ( ! errors )
        {
            Message.confirm( 'Você deseja realmente excluir o lançamento ' + $scope.postingSelected.name, function () 
            {
                PostingService.deletePosting( posting, function( data )
                {
                    loadPostings();
                    $scope.selectPosting( data );
                } );
            } );
        }

        else
        {
            Message.alert( errors );

            $event.preventDefault();
        }
    };

    /**
     * [finishPosting description]
     * @param  {[type]} $event  [description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.finishPosting = function( $event, posting )
    {
        var errors = validateFinish( posting );

        if ( ! errors )
        {
            $scope.posting = $scope.getPostingForm( posting );
                   
            $scope.isFinish = true;

            $( '#store' ).modal();
        }

        else
        {
            Message.alert( errors );

            $event.preventDefault();
        }
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
     * [filterPosting description]
     * @param  {[type]} filters [description]
     * @return {[type]}         [description]
     */
    $scope.filterPosting = function( filters )
    {
        PostingService.filterPosting( filters, function( postings )
        {
            $scope.postings = postings;
        } );
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
     * [getCompletionTypeName description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getCompletionTypeName = function( id )
    {
        return $scope.getCompletionType( id ).name;
    };

    /**
     * [getCompletionType description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getCompletionType = function( id )
    {
        return $scope.completionTypes.filter( function( completion )
        {
            return completion._id === id;
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
     * [validateFinish description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validateFinish( posting )
    {
        if( ! posting )
            return "Selecione um Lançamento para finalizar !";

        if( posting.state === Posting.STATE_DELETED )
            return "Lançamento está deletado,\n não é possivel finaliza-lo !";

        if( posting.state === Posting.STATE_FINISHED )
            return "Lançamento está finalizado,\n não é possivel finaliza-lo duas vezes !";
    };

    /**
     * [validateEdit description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validateEdit( posting )
    {
        if( ! posting )
            return "Selecione um Lançamento para editar !";

        if( posting.state === Posting.STATE_DELETED )
            return "Lançamento está deletado,\n não é possivel edita-lo !";

        if( posting.state === Posting.STATE_FINISHED )
            return "Lançamento está finalizado,\n não é possivel edita-lo após finalizado!";
    };

    /**
     * [validateDelete description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validateDelete( posting )
    {
        if( ! posting )
            return "Selecione um Lançamento para excluir !";

        if( posting.state === Posting.STATE_DELETED )
            return "Lançamento está excluido,\n não é possivel exclui-lo duas vezes !";

        if( posting.state === Posting.STATE_FINISHED )
            return "Lançamento está finalizado,\n não é possivel excluir após finalizado!";

        //var user = $scope.user;

        //if( user.role === 0 && user._id !== posting.user )
          //  return "Você não tem permissão para excluir esse lançamento";
    }

    /**
     * [validateReserve description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validateReserve( posting )
    {
        if( ! posting )
            return "Selecione um Lançamento para extornar!";

        if( posting.state === Posting.STATE_DELETED )
            return "Lançamento está excluido,\n não é possivel extorná-lo!";

        if( posting.state !== Posting.STATE_FINISHED )
            return "Lançamento deve estár finalizado para extornar";

        //if( ! ApplicationUtilities.getInstance().hasPermission() )
          //  return "Você não tem permissão para extornar esse lançamento";
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