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
    var controller = app.controllers.CategoryController;

    app.get('/categories', checkAuthenticated, controller.getCategories );
    
    app.get('/categories:id', checkAuthenticated, controller.getCategory );
        
    app.post('/categories', checkAuthenticated, controller.addCategory );
	
    app.put('/categories', checkAuthenticated, controller.editCategory );
    
    app.delete('/categories/:id', checkAuthenticated, controller.deleteCategory );
};