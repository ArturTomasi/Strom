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
    var controller = app.controllers.EntityController;

    app.get('/entities', checkAuthenticated, controller.getEntities );
    
    app.get('/entities:id', checkAuthenticated, controller.getEntity );
        
    app.post('/entities', checkAuthenticated, controller.addEntity );
	
    app.put('/entities', checkAuthenticated, controller.editEntity );
    
    app.delete('/entities/:id', checkAuthenticated, controller.deleteEntity );
};