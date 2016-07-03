/* global module */

function checkAuthenticated( req, res, next ) 
{
    console.log( 'asdasdasdas');
    
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
    var controller = app.controllers.UserController;

    app.get('/users', checkAuthenticated, controller.getUsers );
    
    app.get('/users:id', checkAuthenticated, controller.getUsers );
        
    app.post('/users/', checkAuthenticated, controller.addUser );
	
    app.put('/users/', checkAuthenticated, controller.editUser );
    
    app.delete('/users/:id', checkAuthenticated, controller.deleteUser );
};