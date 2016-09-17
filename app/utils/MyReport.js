module.exports = function ( name ) 
{
	var MyReport = {}, _MyPDF, _header, _body, _orientation;

	/**
	 * [setOrientation description]
	 * @param {[type]} orientation [description]
	 */
	MyReport.setOrientation = function ( orientation ) 
	{
		_orientation = orientation;
	};

	/**
	 * [setHeader description]
	 * @param {[type]} header [description]
	 */
	MyReport.setHeader = function( header )
	{
		_header = header;
	};

	/**
	 * [setBody description]
	 * @param {[type]} body [description]
	 */
	MyReport.setBody = function( body )
	{
		_body = body;
	};

	/**
	 * [generate description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	MyReport.generate = function( callback ) {
		
		_MyPDF.setOrientation( _orientation );
		console.log( _getContent( _body ) );
		_MyPDF.setContent( _getContent( _body ) );
		_MyPDF.generatePDF( callback );
	};

	/**
	 * [_initValues description]
	 * @return {[type]} [description]
	 */
	_initValues = function()
	{
		_MyPDF = require('../utils/MyHtmlPDF.js')( name );
		_orientation = 'portrait';
		_body = '<h1>Hello World</h1>';		
		
		_header = '<head>' +
					'<link rel="stylesheet"  type="text/css" href="http://localhost:8080/vendor/bootstrap/dist/css/bootstrap.min.css">' +
        			'<link rel="stylesheet"  type="text/css" href="http://localhost:8080/css/default.css">' +
				  '</head>';
	};

	_getContent = function( body )
	{
		return  '<html>' +
					_header +
					'<body>' +
					_body +
					'</body>' +
			 	'</html>';
	};

	_initValues();

	return MyReport;
}
