module.exports = function()
{
	var controller = {};

	controller.index = function( req, res )
	{
		res.render( 'index.ejs', {nome:'Lucas Tomasi'} );
	};

	return controller;
}