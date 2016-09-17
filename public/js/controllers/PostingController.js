angular.module( 'Strom' ).controller( 'PostingController', [ '$scope', 'PostingService' , 'UserService', 'EntityService' , 'CategoryService' , 'CompletionTypeService', '$filter',
												  function (  $scope ,  PostingService  ,  UserService ,  EntityService  ,  CategoryService  ,  CompletionTypeService, $filter ) 
{
    var Posting  = {
        STATE_REGISTRED : 0,
        STATE_PROGRESS  : 1,
        STATE_FINISHED  : 2,
        STATE_DELETED   : 3
    }; 

 	$scope.postingSelected;
    $scope.postings = [];
    $scope.users = [];
    $scope.entities = [];
    $scope.completionTypes = [];
    $scope.categories = [];
    $scope.defaultFilter = {};
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
        $scope.isFinish = false;

        if( posting )
        {
            var _posting = angular.copy( posting );

            _posting.user           = $scope.getUser( _posting.user );
            _posting.entity         = $scope.getEntity( _posting.entity );
            _posting.category       = $scope.getCategory( _posting.category );
            _posting.completionType = $scope.getCompletionType( _posting.completionType );
            _posting.completionAuto = $scope.YesNoOptions[ _posting.completionAuto ? 0 : 1 ];
            _posting.portionTotal   = _posting.portionTotal ? _posting.portionTotal : 1;

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
        var errors = validateToStore(posting);

        if ( ! errors ) 
        {
            PostingService.storePosting( posting, function( data )
            {
                $( '#store' ).modal( 'hide' );
                    
                $scope.selectPosting( data );
                loadPostings();
            }, $scope.isFinish );
        }

        else
        {
            Message.alert( errors );
        }
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
    $scope.deletePosting = function( $event, posting)
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
     * [reversePosting description]
     * @param  {[type]} $event  [description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.reversePosting = function( $event, posting)
    {
        var errors = validateReserve( posting );
       
        if ( ! errors )
        {
            Message.confirm( 'Você deseja realmente extornar o lançamento ' + $scope.postingSelected.name, function () 
            {
                if( posting.state == Posting.STATE_FINISHED )
                {
                    posting.state    = Posting.STATE_PROGRESS;
                    posting.realDate = null;
                    posting.realValue = null;

                    PostingService.storePosting( posting, function( data )
                    {
                        loadPostings();
                        $scope.selectPosting( data );
                    } );
                }

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
     * [copyPosting description]
     * @param  {[type]} $event  [description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.copyPosting = function( $event, posting )
    {
        if ( $scope.postingSelected )
        {
            $scope.posting = $scope.getPostingForm( posting );

            $scope.posting._id = null;
                  
            $( '#store' ).modal();
        }

        else
        {
            Message.alert( 'Selecione um lançamento');

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
     * [getState description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.getState = function( posting )
    {
        if ( posting && posting.state )
        {
            switch( posting.state )
            {
                case 0: return 'Cadastrado';
                case 1: return 'Em Andamento';
                case 2: return 'Finalizado';
                case 3: return 'Excluído';
            }
        }

        return 'n/d';
    };

    /**
     * [filterPosting description]
     * @param  {[type]} filters [description]
     * @return {[type]}         [description]
     */
    $scope.filterPosting = function( filters )
    {
        $scope.defaultFilter = filters;

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
        var item = $scope.getUser( id );
        
        if ( item ) return item.name;

        return 'n/d';
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
        var item = $scope.getCategory( id );
        
        if ( item ) return item.name;

        return 'n/d';
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
        var item = $scope.getEntity( id );
        
        if ( item ) return item.name;

        return 'n/d';
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
        var item = $scope.getCompletionType( id );
        
        if ( item ) return item.name;

        return 'n/d';
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
     * [print description]
     * @return {[type]} [description]
     */
    $scope.print = function( _posting )
    {
        var _filter;

        if ( _posting ) _filter =  { _id: [ _posting._id ] };

        if ( ! _posting ) _filter = $scope.defaultFilter;

        PostingService.print( _filter, function( pdf )
        {
            var element = document.createElement('a');
            element.setAttribute('href', pdf );
            element.setAttribute('download', "Strom-lancamentos.pdf" );

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        } );
    };

    /**
     * [createPortions description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    $scope.createPortions = function( posting )
    {
        if ( posting && posting.portionTotal >  1 )
        {
            if ( ! posting.values ) posting.values = [];
            
           
            for ( var i =  posting.portionTotal - 1; i < posting.values.length ; i++ ) 
            {
                posting.values.pop();
            }          


            for ( var i = 0; i < posting.portionTotal - 1; i++ ) 
            {
                if ( ! posting.values[ i ] )
                {
                    var _copy = angular.copy( posting );

                    delete _copy.values;

                    _copy.estimateDate = moment( posting.estimateDate ).add( (i + 1), 'month' );

                    _copy.state = Posting.STATE_REGISTRED;

                    posting.values[i] = _copy;
                }
            }

            return posting.values;
        }
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

        if( posting.state !== Posting.STATE_PROGRESS && posting.portionTotal > 1 )  
            return "Lançamento não está correte,\n não é possivel finaliza-lo antes das outras parcelas!";
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
     * [validateToStore description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validateToStore( posting )
    {
        var errors = "";

        if ( $scope.isFinish )
        {
            if ( ! posting.realDate ) errors += "Preencha uma data para finalizar o lançamento!<br>";

            if ( ! posting.realValue || posting.realValue === 0 ) errors += "Preencha um valor maior que zero para finalizar o lançamento!<br>";

            if ( ! posting.completionType ) errors += "Preencha um tipo de finalização!";
        }

        if ( ! posting._id && posting.portionTotal > 1 )
        {
            posting.values.forEach( function( portion, index ) 
            {
                if ( ! portion.estimateDate ) errors += "Preencha uma data estimada para a parcela " + ( index + 1 ) + "!<br>";
                
                if ( ! portion.estimateValue ) errors += "Preencha um valor estimado para a parcela " + ( index + 1 ) + "!<br>";
            } );
        }

        return errors;
    };
    

    /**
     * [loadPostings description]
     * @return {[type]} [description]
     */
    loadPostings = function()
    {
        PostingService.filterPosting( $scope.defaultFilter , function( data )
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
     * [makeDefaultFilter description]
     * @return {[type]} [description]
     */
    makeDefaultFilter = function()
    {
        $scope.defaultFilter = {};

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
        makeDefaultFilter();
    };

    init();

} ] );