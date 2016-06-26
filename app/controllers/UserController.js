module.exports = function ( app ) 
{
       
    var user = app.models.User;

    var controller = {};
   
    var users = [ { _id: 1, name: "Artur Tomasi", login: "art",  password: "admin", state: true, mail: 'art@interact.com.br', phone: '93097799' },
                  { _id: 2, name: "Lucas Tomasi", login: "lcs",  password: "admin", state: true, mail: 'art@interact.com.br', phone: '93097799' },
                  { _id: 3, name: "Jack",         login: "jack", password: "admin", state: true, mail: 'art@interact.com.br', phone: '93097799' } ];
              

    controller.getUsers = function( req, res )
    {
        res.json( users );
    };

    controller.getUser = function( req, res )
    {
        res.json( users );
    };

    controller.addUser = function( req , res )
    {
        var user = req.body;
        
        if ( user )
        {
            var count = users.length;
            
            user._id = ++count;
            
            users.push( user ); 
            
            res.json( user );
        }
    };
   
    controller.editUser = function( req , res )
    {
        var user = req.body;
        
        if ( user )
        {
            users = users.map( function(u)
            {
                if( u._id === user._id )
                {
                   u = user;
                }
                
                return u;
            } );
             
            res.json( user );
        }
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
            
            res.status( 204 ).end();
        }
        
        res.status( 404 ).end();
    };

    return controller;
};

