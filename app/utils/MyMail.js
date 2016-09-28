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

	MyMail.addAttachment = function( _attachment ) {

	    if( _attachment.path && _attachment.filename ) {  
	        attachments.push( _attachment );
	    } else {
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

	MyMail.setHtml = function( content ){
	    html = content;
	};

	MyMail.send = function(){
		if( to && html && subject ) {	    
		    ini.parse( './config/mail.ini' , function ( error , mail ) {
		        service = mail.service;
		        from    = mail.from;
		        user    = mail.user;
		        pass    = mail.pass;

		        config  = 'smtps://'+user+':'+pass+'@'+service;

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
			            throw err;
			        }
			        return true;
			    });
	    	});    
		}
	};

	return MyMail;
}