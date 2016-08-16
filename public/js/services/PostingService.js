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
     * 
     * @param {type} posting
     * @param {type} callback
     * @returns {undefined}
     */
    PostingService.storePosting = function( posting, callback )
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
                Message.error( error );
            } );
        }
    };
	
    return PostingService;
} ] );