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

    Message.alert = function ( message )
    {
        if ( typeof message === 'object' ) message = JSON.stringify( message );

        swal("Atenção!", message, "warning");
    };

    Message.error = function ( message )
    {
        if ( typeof message === 'object' ) message = JSON.stringify( message );

        swal("Opss!", message , "error" );
    };

    Message.success = function ( message )
    {
        swal("Sucesso!", message , "success");
    };

    Message.confirm = function ( message , callback, param )
    {
        swal({
            title: "Continuar ?",
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#459c50",
            confirmButtonText: "Sim!",
            cancelButtonText: "Cancelar",
            closeOnConfirm: true
        }, function( isConfirm ){
            if( isConfirm ) {
                eval( callback( param ) );
            }
        });
    };

    Message.question = function ( message , callback, title, message_confirm )
    {
        var m = (message_confirm)? message_confirm : 'Yes, do it!';
        var t = (title)? title : 'Are you sure?';
        swal({
            title: t,
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#459c50",
            confirmButtonText: message_confirm,
            closeOnConfirm: true
            }, function(){
                eval( callback() );
        });
    };

    Message.prompt = function ( message )
    {
        swal({
            title: message,
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "..."
        }, function(inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("Please, " + message + "!" );
                return false;
            }
            swal("Success!", "", "success");
        });
    };

    Message.text = function ( message, function_eval )
    {
        swal({
            title: message,
            text: "<textarea id='mytextareaalert' col='10' rows='4'></textarea>",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "..." ,
            html: true
        }, function() {
            var text = $('#mytextareaalert');

            if (text.val() === false) return false;
            if (text.val() === "") {
                $( '#mytextareaalert' ).after( '<div id="myerror" class="sa-error-container show"><div class="icon">!</div><p> Please, '+ message +'!</p></div>' );
                return false;
            }
            eval( function_eval( text.val() ) );
            swal("Success!", text.val() , "success");
        });
    };
    return Message;

 }));
