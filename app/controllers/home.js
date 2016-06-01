module.exports = function()
{
	var controller = {};

	controller.index = function( req, res )
	{
		res.render( 'index.ejs', {nome:'Artur Tomasi'} );
	};

	return controller;
}

