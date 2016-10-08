angular.module( 'Strom' ).factory( 'PostingService', [ '$q', '$http', function ( $q, $http )
{
	var PostingService = {};	

	/**
	 * [getPostings description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
    PostingService.getPostings = function( callback )
    {
        var d = $q.defer();

        $http.get( '/postings' )
        
        .success( function( postings )
        {
            eval( callback( postings ) );  

            d.resolve( postings );
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );

        return d.promise;
    };
    
    /**
     * 
     * @param {type} id
     * @param {type} callback
     * @returns {undefined}
     */
    PostingService.getPosting = function( id, callback )
    {
        var d = $q.defer();

        $http.get( '/postings/' + id )
        
        .success( function( posting )
        {
            eval( callback( posting ) );  
            
            d.resolve( posting );
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );

        return d.promise;
    };

    /**
     * [filterPosting description]
     * @param  {[type]}   filters  [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    PostingService.filterPosting = function( filters, callback )
    {
        var d = $q.defer();

        $http.post( '/postingfiltered/', filters )

        .success( function ( postings ) 
        {
            eval( callback( postings ) );

            d.resolve( postings );
        } )

        .error ( function ( error )
        {
            Message.alert( error );            
        });

        return d.promise;
    };
    
    /**
     * [getPostingAgenda description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    PostingService.getPostingAgenda = function( callback )
    {
        var d = $q.defer();

        $http.get( 'postingAgenda' )

        .success( function( postings )
        {
            eval( callback( postings ) );

            d.resolve( postings );
        } )

        .error( function( error ) 
        {
            Message.alert( error );
        } );

        return d.promise;
    };

    /**
     * [getMapMonth description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    PostingService.getMapMonth = function( callback )
    {
        var d = $q.defer();

        $http.get( 'mapMonth' )

        .success( function( map )
        {
            eval( callback( map ) );

            d.resolve( map );
        } )

        .error( function( error ) 
        {
            Message.alert( error );
        } );

        return d.promise;
    };

    /**
     * 
     * @param {type} posting
     * @param {type} callback
     * @returns {undefined}
     */
    PostingService.storePosting = function( posting, callback, params )
    {
        if ( ! posting._id )
        {
            $http.post( '/postings/' , posting )
            
            .success( function( posting )
            {
                eval( callback( posting ) );
            } )
            
            .error( function (error) 
            {
              Message.alert( error );
            } );  
        }
        
        else
        {
            $http.put( '/postings/' , posting )
            
            .success( function( posting )
            {
                eval( callback( posting ) );
            } )
            
            .error( function (error) 
            {
                Message.alert( error );
            } );
        }
    };
    
    /**
     * 
     * @param {type} posting
     * @param {type} callback
     * @returns {undefined}
     */
    PostingService.deletePosting = function( posting, callback )
    {
        if( posting )
        {
            $http.delete( '/postings/' + posting._id )

            .success( function( posting )
            {
                eval( callback( posting ) );
            } )

            .error( function (error) 
            {
                Message.alert( error );
            } );
        }
    };
	
    /**
     * [print description]
     * @param  {[type]}   filter   [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    PostingService.print = function( filter, callback )
    {
        if ( filter )
        {
            $http.post( '/printPostings/' , filter, { preload: true } )
            
            .success( function( pdf )
            {
                eval( callback( pdf ) );
            } )
            
            .error( function (error) 
            {
                Message.alert( error );            
            } );  
        }
    }

    /**
     * [sendMail description]
     * @param  {[type]} wrapper [description]
     * @return {[type]}         [description]
     */
    PostingService.sendMail = function( wrapper, callback )
    {
        $http.post( '/sendPostings/', wrapper )

        .success( function()
        {
            eval( callback() );
        } )

        .error(function( error ) 
        {
            Message.alert( error );
        } );
    }

    return PostingService;
} ] );