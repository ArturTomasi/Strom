module.exports = function( app )
{
    var controller = app.controllers.UserController;

    app.get('/users',  controller.getUsers );
    
    app.get('/users:id', controller.getUsers );
        
    app.post('/users/', controller.addUser );
	
    app.put('/users/', controller.editUser );
    
    app.delete('/users/:id', controller.deleteUser );
};