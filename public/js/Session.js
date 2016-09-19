(function (root, factory) {

    "use strict";

     // CommonJS module is defined
     if (typeof module !== 'undefined' && module.exports) {
         module.exports = factory(require('jquery'), require('bootstrap'));
     }
     // AMD module is defined
     else if (typeof define === "function" && define.amd) {
         define("bootstrap dialog", ["jquery", "bootstrap"], function ($) {
             return factory($);
         });
     } else {
         // planted over the root!
         root.Session = factory(root.jQuery);
     }


    root.Session = factory();
}
(this, function ($) 
{
    var Session = {};
    var args = [];
 
    Session.put = function( name , value )
    {
        args.push( name );
        sessionStorage.setItem( name , JSON.stringify( value ) );
    };


    Session.get = function ( name ) 
    {
        return JSON.parse( sessionStorage.getItem( name ) );  
    };

    Session.remove = function ( name ) 
    {
        args = args.filter( function ( value ) {
           return name != value;  
        });
        sessionStorage.removeItem( name );
    };

    Session.clear = function () 
    {
        sessionStorage.clear();
    };

    return Session;

} ) );