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
					var key = new Date( item._id.year, item._id.month );

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

	};

	return HistoryBox;
} ] );