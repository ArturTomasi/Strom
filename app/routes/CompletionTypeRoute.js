/* global module */

function checkAuthenticated( req, res, next ) 
{
    if ( req.isAuthenticated() )
    {
        return next();
    }

    else
    {
        res.status( '401' ).json( 'Sem autorização' );
    }
  
};

module.exports = function( app )
{
    var controller = app.controllers.CompletionTypeController;

    app.get('/completionTypes', checkAuthenticated, controller.getCompletionTypes );
    
    app.get('/completionTypes:id', checkAuthenticated, controller.getCompletionType );
        
    app.post('/completionTypes', checkAuthenticated, controller.addCompletionType );
	
    app.put('/completionTypes', checkAuthenticated, controller.editCompletionType );
    
    app.delete('/completionTypes/:id', checkAuthenticated, controller.deleteCompletionType );
};