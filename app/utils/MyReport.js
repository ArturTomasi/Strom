/**
 * [exports description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
module.exports = function ( app ) 
{
	var MyReport = {}, _shortId, _data;

	/**
	 * [setShortId description]
	 * @param {[type]} shortId [description]
	 */
	MyReport.setShortId = function( shortId )
	{
		_shortId = shortId;
	};

	/**
	 * [setData description]
	 * @param {[type]} data [description]
	 */
	MyReport.setData = function( data )
	{	
		_data = data;
	};

	/**
	 * [generate description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	MyReport.generate = function( callback ) 
	{
		app.jsreport.render(
        {
            template: 
            {
                'shortid': _shortId
            },
            data: 
            {
                "posting" : _data
            }
        })
        .then( function( out )
        {
        	console.log( out.headers );
        	
        	var base64 = "data:application/pdf;base64," + out.content.toString( "base64" );
        	
            eval( callback( base64 ) );
        } )
        .catch( function( error ) 
    	{
    		console.log( 'error' );	
    		console.log( error );	
    	});
	};

	return MyReport;
}
