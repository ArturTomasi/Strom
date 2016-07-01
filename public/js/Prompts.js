(function (root, factory) {

    "use strict";

    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'), require('bootstrap'));
    }
    // AMD module is defined
    else if (typeof define === "function" && define.amd) {
        define("bootstrap-dialog", ["jquery", "bootstrap"], function ($) {
            return factory($);
        });
    } else {
        // planted over the root!
        root.Prompts = factory(root.jQuery);
    }

}
(this, function ($) 
{
    var Prompts = new Object();
    
    Prompts.alert = function ( erros )
    {
        var dialog = new BootstrapDialog( 
        {
            message: function( dialogRef )
            {
                var $body = $('<div></div>');
                var $message = $('<div style="font-size: 35px; font-weigh: bold">ALERTA</div>');
                var $button = $('<span style="font-size: 35px; float: right; cursor: pointer;" class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                
                $button.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                });

                for ( var error in erros )
                {
                    $message.append( $('<div  style="font-size: 15px; font-weigh: normal;> *' + error + '</div>' ) );
                }

                $body.append($button);
                $body.append($message);

                return $body;
            },

            closable: false
        } );
        
        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.getModalFooter().hide();
        dialog.getModalBody().css('background-color', '#FFEA00');
        dialog.getModalBody().css('color', '#fff');
        dialog.getModalBody().css('border-radius', '20px');
        dialog.getModalContent().css('border-radius', '20px');
        dialog.getModalContent().height( '250px');
        dialog.getModalBody().height( '250px');
        dialog.open();
    };
    
    return Prompts;
 }));