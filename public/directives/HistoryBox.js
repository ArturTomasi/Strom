angular.module( 'Strom' ).directive( 'historyBox', [ function () 
{
	var HistoryBox = {};

	HistoryBox.restrict = 'E';

	HistoryBox.templateUrl = 'directives/html/HistoryBox.html';
	
	HistoryBox.require = 'ngModel';

	HistoryBox.scope = {};

	HistoryBox.link = function( scope, iElement, iAttrs, iController )
	{
		scope.histories = [];

		iController.$render = function() 
        {
        	var group = iController.$viewValue;
	
			if ( group )
			{
				var temp = [];

				group.map( function( item )
				{
					var key = new Date( item._id.year, item._id.month - 1 );

					var _value = temp[ key ];

					if ( ! _value )  _value = { key: key }
					
					_value[ item._id.type ] = item.realValue;

					temp[ key ] = _value;
				} );

				for ( var i in temp )
				{
					scope.histories.push( temp[i] );
				}
			}
        };

        scope.formatNumber = function( number )
        {
        	if ( number )
        	{
        		return number.toFixed( 2 );
        	}

        	return Number( 0 ).toFixed( 2 );
        }


        scope.formatMonth = function( date )
        {
        	if ( date )
        	{
        		var month = date.toLocaleString( 'pt-br', { month: "short" } );

        		return month.charAt( 0 ).toUpperCase() + month.substring( 1, month.length );
        	}
        }

        scope.isUp = function( revenue, cost )
        {
        	if ( ! revenue && cost ) return false;

        	if ( ! cost && revenue ) return true;

        	return cost && revenue && cost < revenue;
        }

	};

	return HistoryBox;
} ] );