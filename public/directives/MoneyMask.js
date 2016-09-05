var Strom = angular.module('Strom');
 
Strom.directive( 'moneyMask', [ '$filter', '$browser', function( $filter, $browser )
{
    var MoneyMask = {};

    MoneyMask.require = 'ngModel';

    MoneyMask.link =  function( $scope, $element, $attrs, ngModelCtrl )
    {
        var listener = function() 
        {
            var value = $element.val().replace( /[^0-9.,]/g, '' );

            $element.val( $filter('money') ( value, false ) );
        };

        ngModelCtrl.$parsers.push( function( viewValue )
        {
            return viewValue.replace( /[^0-9.,]/g, '' );
        } );

        ngModelCtrl.$render = function() 
        {
            $element.val( $filter('money')( ngModelCtrl.$viewValue, false ) );
        };

        $element.on( 'focus', function() { $(this).select(); } );

        $element.bind( 'change', listener );
        
        $element.bind( 'keydown', function(e)
        {
            var value = $element.val() + "";

            if( e.keyCode === 190 && value.indexOf( '.' ) > -1 ) e.preventDefault();

            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
                 // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        $element.bind( 'paste cut', function()
        {
            $browser.defer( listener );
        });
    }

    return MoneyMask;
} ] );

Strom.filter( 'money', function () 
{
	return function( number )
    {
        if ( ! number )
        {
            number = "0";
        }

        var places   = 2;
        var symbol   = "R$ ";
        var thousand = " ";
        var decimal  = ".";
        var negative = number < 0 ? "-" : "";

        var i = parseInt( number = Math.abs( +number || 0 ).toFixed( places ), 10 ) + ""
        var j = (j = i.length) > 3 ? j % 3 : 0;
        
        var result = 
            symbol   + 
            negative + 
            (j ? i.substr(0, j) + thousand : "") + 
            i.substr( j ).replace( /(\d{3})(?=\d)/g, "$1" + thousand ) + 
            (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "" );

        return result;
    };
} );
