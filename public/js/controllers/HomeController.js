angular.module( "Strom" ).controller('HomeController', [ '$scope', 'PostingService', function ( $scope, PostingService )
{
    $scope.groupCost;
    $scope.percentCost;
    $scope.percentRevenue;
    $scope.groupRevenue;
    $scope.groupMonth;

    adjustData = function( data )
    {
        $scope.groupCost    = data[1] || 0;
        $scope.groupRevenue = data[0] || 0;

        var sum = $scope.groupCost.realValue + $scope.groupRevenue.realValue;

        $scope.percentCost    = Math.round( ( $scope.groupCost.realValue * 100 ) / sum );
        $scope.percentRevenue = Math.round( ( $scope.groupRevenue.realValue * 100 ) / sum );
    }

	function init()
    {
        PostingService.getProgressPosting( function( data )
        {
            adjustData( data );
        } );

        PostingService.getHistory( function( data )
        {
            $scope.groupMonth = data;
        } );
    }

    init();
} ] );
