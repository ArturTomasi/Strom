module.exports = function ( app )
{
    app.get( '/', function( req, res )
    {
        var login ;
        
        if( req.user )
        {
            login = req.user.name;
        	res.render( 'index', { "currentUser": login } ); 
        }
        else
        {
        	res.render( 'login' );	
        }
        
    } );
};