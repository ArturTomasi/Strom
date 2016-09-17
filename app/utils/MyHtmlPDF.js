module.exports = function ( name ) {
	
	var pdf     =require('html-pdf')
	  , options = { format: 'A4', orientation: 'portrait' }
	  , nameFormatted = ( !name.endsWith( '.pdf' ) )? name + ".pdf" : name
	  , path    = "./tmp/"+nameFormatted
	  , html    = "<br>"
	  , footerContentDefault = '<span style="font-size: 10px; text-align: right;width: 100%;float: right;">{{page}} of {{pages}}</span>'
	  , footerHeightDefault  = '10mm'
	  , MyHtmlPDF = {}; 

	MyHtmlPDF.setContent = function( content ) {
		html = content;
	}

	/**
	 * 
	 * @param {[type]} height px, mm, cm
	 * @param {[type]} html   {{page}} {{pages}}
	 */
	MyHtmlPDF.setFooter = function( content , height ) {
		footerContentDefault = ( content )? content : footerContentDefault;
		footerHeightDefault  = ( height ) ? height  : footerHeightDefault;
		options.footer = {
		    height:   footerHeightDefault,
		    contents: footerContentDefault
		};
	}

	MyHtmlPDF.setBorder = function( top, right, bottom, left ){
		 options.border = {
		 	top    : top,
		 	right  : right,
		 	bottom : bottom,
		 	left   : left
		 };
	};

	MyHtmlPDF.setOrientation = function( orientation )
	{
		 options.orientation = orientation;
	};


	MyHtmlPDF.generatePDF = function( callback ) {
		
		pdf.create( html ).toBuffer( function( err, buffer )
		{
			eval( callback( "data:application/pdf;base64," + buffer.toString( 'base64' ) ) );
		} );
	}
	
	return MyHtmlPDF;
}