module.exports = function () {
	
	var MyMail = {}
	  , nodemailer  = require( 'nodemailer' )
	  , ini         = require( 'node-ini' )
	  , user        = ''
	  , pass        = ''
	  , service     = ''
	  , from        = ''
	  , mymail      = ''
	  , to          = ''
	  , subject     = ''
	  , html        = ''
	  , attachments = []
	  , from        = '';

	MyMail.addAttachment = function( name, base64 ) 
	{
	    if ( name && base64 ) 
	    {
	        attachments.push( { filename: name, path: base64 } );
	    }
	    
	    else 
	    {
	        throw "it is necessary attributes: 'path' and 'filename' ";
	    }
	};

	MyMail.setSubject = function( _subject ){
	    subject = _subject;
	};

	MyMail.setTo = function( name , email ){
	    if( name && email ) {
	        to = '"' + name + '"<' + email + '>'; 
	    }
	};

	MyMail.setHtml = function( content )
	{
	    html = content;
	};

	MyMail.send = function()
	{
		try
		{
			if( to && html && subject )
			{	 
				console.log( "here" )   
			    ini.parse( './config/mail.ini' , function ( error , mail ) 
			    {
			        service = mail.service;
			        from    = mail.from;
			        user    = mail.user;
			        pass    = mail.pass;

			        config  = 'smtps://'+user+':'+pass+'@'+service;

			        console.log( config );
			        console.log( service );
			        console.log( user );
			        console.log( from );

			        mymail  = nodemailer.createTransport( config );

				    mymail.sendMail({
				        from:    from, 
				        to:      to,
				        subject: subject,
				        html:    html,
				        attachments: attachments 
				    }, function(err) {
				        if(err) {
				        	console.log( err );
				            return false;
				        }
				        return true;
				    });
		    	} );    
			}
		}

		catch ( e )
		{
			console.log( e );
		}
	};

	return MyMail;
}