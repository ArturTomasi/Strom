angular.module( 'Strom' ).factory( 'PostingService', [ '$http', function ( $http )
{
	var PostingService = {};	

	/**
	 * [getPostings description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
    PostingService.getPostings = function( callback )
    {
        $http.get( '/postings' )
        
        .success( function( postings )
        {
            eval( callback( postings ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );
    };
    
    /**
     * 
     * @param {type} id
     * @param {type} callback
     * @returns {undefined}
     */
    PostingService.getPosting = function( id, callback )
    {
        $http.get( '/postings/' + id )
        
        .success( function( posting )
        {
            eval( callback( posting ) );  
        } )
        
        .error( function (error) 
        {
            Message.error( error );
        } );
    };

    /**
     * [filterPosting description]
     * @param  {[type]}   filters  [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    PostingService.filterPosting = function( filters, callback )
    {
        $http.post( '/postingfiltered/', filters )

        .success( function ( postings ) 
        {
            eval( callback( postings ) );
        } )

        .error ( function ( error )
        {
            Message.alert( error );            
        });
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
            $http.put( '/postings/' , posting, { params : 'artur-tomasi' } )
            
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
            $http.post( '/printPostings/' , filter )
            
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

    return PostingService;
} ] );