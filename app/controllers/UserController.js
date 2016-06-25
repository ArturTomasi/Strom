module.exports = function ( app ) 
{
       
    var user = app.models.User;

    var controller = {};
   
    var users = [ { _id: 1, name: "Artur Tomasi", login: "art",  password: "admin" },
                         { _id: 2, name: "Lucas Tomasi", login: "lcs",  password: "admin" },
                         { _id: 3, name: "Jack",         login: "jack", password: "admin"} ];
              

    controller.getUsers = function( req, res )
    {
        console.log( 'buscando ');
        console.log( users );
        res.json( users );
    };

    controller.getUser = function( req, res ) 
    {
        if( user === findUser( req.params.id ) )
        {
            res.json( user );
        }
        else
        {
            res.status(400).send('user not found');
        }
    };

    controller.addUser = function( req , res )
    {
        
    };
   
    controller.editUser = function( req , res )
    {
        
    };

    controller.deleteUser = function( req , res )
    {
        var id = req.params.id;
     
        if( id )
        {
            users = users.filter( function ( user ) 
            {
                return user._id != id;
            } );
            
            console.log( 'deletando ');
            console.log( users );
            res.status( 204 ).end();
        }
        
        res.status( 404 ).end();
    };

    return controller;
};

