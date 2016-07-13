angular.module( 'Strom' )

.directive('postingTable', [function () 
{
	var PostingTable = {};
	
	PostingTable.restrict = 'E';

	PostingTable.templateUrl = 'partials/Posting/PostingTable.html';

	return PostingTable;
}] )

.directive('postingActions', [function () 
{
	var PostingActions = {};
	
	PostingActions.restrict = 'E';

	PostingActions.templateUrl = 'partials/Posting/PostingActions.html';
	
	PostingActions.link =  function( $scope, $element, $attrs, ngModelCtrl )
	{
		$scope.isVisible = function ( mode )
		{
			return $element.attr( 'mode' ) === mode;	
		};
	};

	return PostingActions;
}] )

.directive('postingForm', [function () 
{
	var PostingForm = {};
	
	PostingForm.restrict = 'E';

	PostingForm.templateUrl = 'partials/Posting/PostingForm.html';

	return PostingForm;
}] );