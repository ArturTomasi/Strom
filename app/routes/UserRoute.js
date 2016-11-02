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
    var controller = app.controllers.UserController;

    app.get('/users', checkAuthenticated, controller.getUsers );

    app.get('/users:id', checkAuthenticated, controller.getUser );

    app.post('/users/', checkAuthenticated, controller.addUser );

    app.post( '/annotation/', checkAuthenticated, controller.saveAnnotation );

    app.get( '/annotation/', checkAuthenticated, controller.getAnnotation );

    app.put('/users/', checkAuthenticated, controller.editUser );

    app.delete('/users/:id', checkAuthenticated, controller.deleteUser );
};
