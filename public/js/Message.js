/* global module, define */

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
        root.Message = factory(root.jQuery);
    }

}
(this, function ($) 
{
    var Message = new Object();
    
    
    Message.alert = function ( message ) {
        
        var mess = message ?  message : 'Alert' ;

        var dialog = new BootstrapDialog( 
        {
            message: function( dialogRef )
            {
                var $body = $('<div></div>');
                var $title = $('<div style="font-size: 20px; font-weight: bold;">Information</div>');
                
                var $message = $('<div  style="height:115px;font-size: 15px;">' + mess + '</div>' );

                var $button  = $('<span style="font-size: 20px; padding-right:10px; float: right; cursor: pointer;" class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                
                $button.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                });

                $body.append($title);
                $body.append($message);
                $body.append($button);
                
                return $body;
            }
        });

        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.getModalFooter().hide();
        dialog.getModalBody().css('color', '#fff');
        dialog.getModalBody().css('background-color' , '#ec971f');
        dialog.getModalBody().css('border-color' , '#d58512');
        dialog.getModalBody().css('border-radius', '20px');
        dialog.getModalContent().css('border-radius', '20px');
        dialog.getModalContent().height( '200px');
        dialog.getModalBody().height( '200px');
        dialog.open();   
    };

    Message.success = function ( message ) {
        
        var mess = message ? message : 'Success' ;

        var dialog = new BootstrapDialog( 
        {
            message: function( dialogRef )
            {
                var $body = $('<div></div>');
                var $title = $('<div style="font-size: 20px; font-weight: bold;">Information</div>');
                
                var $message = $('<div  style="height:115px;font-size: 15px;">' + mess + '</div>' );

                var $button  = $('<span style="font-size: 20px; padding-right:10px; float: right; cursor: pointer;" class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                
                $button.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                });

                $body.append($title);
                $body.append($message);
                $body.append($button);
                
                return $body;
            }
        });

        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.getModalFooter().hide();
        dialog.getModalBody().css('color', '#fff');
        dialog.getModalBody().css('background-color' , '#419641');
        dialog.getModalBody().css('border-color' , '#398439');
        dialog.getModalBody().css('border-radius', '20px');
        dialog.getModalContent().css('border-radius', '20px');
        dialog.getModalContent().height( '200px');
        dialog.getModalBody().height( '200px');
        dialog.open();   
    };

    Message.error = function ( message ) {

        var mess = ( message )? message : 'Error' ;

        var dialog = new BootstrapDialog( 
        {
            message: function( dialogRef )
            {
                var $body = $('<div></div>');
                var $title = $('<div style="font-size: 20px; font-weight: bold;">Information</div>');
                
                var $message = $('<div  style="font-size: 15px;"> ' + mess + '</div>' );

                var $button  = $('<span style="font-size: 20px; float: right; cursor: pointer;" class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                
                $button.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                });

                $body.append($button);
                $body.append($title);
                $body.append($message);
                
                return $body;
            }
        });

        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.getModalFooter().hide();
        dialog.getModalBody().css('color', '#fff');
        dialog.getModalBody().css('background-color' , '#c9302c');
        dialog.getModalBody().css('border-color' , '#ac2925');
        dialog.getModalBody().css('border-radius', '20px');
        dialog.getModalContent().css('border-radius', '20px');
        dialog.getModalContent().height( '200px');
        dialog.getModalBody().height( '200px');
        dialog.open();
    };

    Message.confirm = function ( message , callback ) {
         
        var dialog = new BootstrapDialog( 
        {
            message: function( dialogRef )
            {
                var $body = $('<div></div>');
                var $title = $('<div style="font-size: 20px; font-weight: bold;">Information</div>');
                
                var $message = $('<div  style="height:115px;font-size: 15px;"> ' + message + '</div>' );

                var $buttons = $('<div style="font-size: 20px; paddingRight:10px; float: right; cursor: pointer;"></div>');
                var $buttonCancel  = $('<button class=" btn btn-danger glyphicon glyphicon-remove"></button>');
                var $buttonOk      = $('<button class=" btn btn-success glyphicon glyphicon-ok"></button>');
                
                $buttonCancel.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                });

                $buttonOk.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                    eval( callback() );
                });

                $buttons.append($buttonOk);
                $buttons.append($buttonCancel);

                $body.append($title);
                $body.append($message);
                $body.append($buttons);
                
                return $body;
            }
        });

        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.getModalFooter().hide();
        dialog.getModalBody().css('color', '#fff');
        dialog.getModalBody().css('background-color' , '#286090');
        dialog.getModalBody().css('border-color' , '#204d74');
        dialog.getModalBody().css('border-radius', '20px');
        dialog.getModalContent().css('border-radius', '20px');
        dialog.getModalContent().height( '200px');
        dialog.getModalBody().height( '200px');
        dialog.open();
    };

    return Message;

 }));