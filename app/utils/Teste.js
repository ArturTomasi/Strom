var Mail = require( './MyMail.js' )();

function doWork()
{
     	Mail.setSubject( 'Teste do Art' );
	Mail.setHtml( '<h1>arturlindo</h1>' );     	
	Mail.setTo( 'Artur', 'tomasi.artur@gmail.com' );
	Mail.send();
     	console.log( Mail );
}

doWork();
