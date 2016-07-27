var fs = require( 'fs' );

var config = require( 'node-ini' );

const home = '';

config.parse( '../../config/application.ini', function( error, config )
{
    if ( ! error )
    {
        home = config.home;
    }
} );

module.exports = function () 
{
	var FileUtilities = {};
	
	/**
	 * [save description]
	 * @param  {[type]} posting [description]
	 * @param  {[type]} base64  [description]
	 * @return {[type]}         [description]
	 */
	FileUtilities.save = function ( posting, base64 ) 
	{
		FileUtilities.validPath();

		for ( var i in posting.attachments )
		{
			var attachement = posting.attachments[i];

			var index = attachment.indexOf( ';base64' );

			if ( index )
			{
			 	var base64Data = attachment.base64.substr( index + 7, attachment.base64.length );

				fs.writeFile( attachment.url, base64Data, 'base64', function( err )
				{
					if ( error )
				  		console.log( 'Error: ' + error );
				});
			}
		}
	};

	FileUtilities.open = function ( attachment )
	{
		 //todo
	};

	/**
	 * [validPath description]
	 * @return {[type]} [description]
	 */
	FileUtilities.validPath = function()
	{
		if ( ! fs.existsSync( home ) )
		{
			fs.mkdirSync( home );
		}
	}


	return FileUtilities;
};
