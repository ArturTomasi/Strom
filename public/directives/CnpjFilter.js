var Strom = angular.module('Strom');
 
Strom.directive( 'cnpjFilter', [ '$filter', '$browser', function( $filter, $browser )
{
    var CnpjFilter = {};

    CnpjFilter.require = 'ngModel';

    CnpjFilter.link =  function( $scope, $element, $attrs, ngModelCtrl )
    {
        var listener = function() 
        {
            var value = $element.val().replace( /[^0-9]/g, '' );

            $element.val( $filter('cnpj') ( value, false ) );
        };

        ngModelCtrl.$parsers.push( function( viewValue )
        {
            return viewValue.replace( /[^0-9]/g, '' ).slice( 0,18 );
        } );

        ngModelCtrl.$render = function() 
        {
            $element.val( $filter('cnpj')( ngModelCtrl.$viewValue, false ) );
        };

        $element.bind( 'change', listener) ;

        $element.bind( 'keydown', function( event )
        {
            var key = event.keyCode;

            if ( key == 91 || ( 15 < key && key < 19 ) || ( 37 <= key && key <= 40 ) ) 
            {
                return;
            }
                $browser.defer( listener );
        });

        $element.bind( 'paste cut', function()
        {
            $browser.defer( listener );
        });
    }

    return CnpjFilter;
} ] );

angular.module( 'Strom' ).filter( 'cnpj', function() 
{
    return function( input )
    {
  	 
  	    var str = input+ '';
        str=str.replace(/\D/g,'');
      	str=str.replace(/^(\d{2})(\d)/,'$1.$2');
      	str=str.replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3');
      	str=str.replace(/\.(\d{3})(\d)/,'.$1/$2');
      	str=str.replace(/(\d{4})(\d)/,'$1-$2');
        
        if( str.length >= 18 )
        {
          str = str.substr(0,18);
        }

        return str;
    };
} );