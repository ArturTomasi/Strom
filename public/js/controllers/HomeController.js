angular.module( "Strom" ).controller('HomeController', [ '$scope', 'PostingService', function ( $scope, PostingService )
{
	var revenueData = [], costData = [], categories = [];

	function refreshGraphic()
	{
	    $( '#homeChart' ).highcharts(
        {
            chart:    { backgroundColor: '#ECEFF1' },
            title:    { text: 'Balanço Mensal - ' + moment().format( 'MMMM' ), style: { fontWeight: 'bold', color: "#607D8B" } },
            subtitle: { text: 'Acumulado dos lançamentos finalizados do mês de ' + moment().format( 'MMMM' ) + " (por dia)", style: { color: "#607D8B" } },
            tooltip:  { shared: true, pointFormat: '{series.name}: <b>R$ {point.y:,.2f}</b><br/>' },
            legend:   { layout: 'horizontal', align: 'center', verticalAlign: 'bottom', floating: false, backgroundColor: 'transparent' },

            xAxis: [ { categories: categories, crosshair: true } ],
            yAxis: [
            {
                labels: { format: '{value}', enabled: false, style: { color: 'red' } },
                title:  { text: 'Despesas',  enabled: false, style: { color: 'red' } }
            },
            {
                labels: { format: '{value}', enabled: false, style: { color: 'green' } },
                title:  { text: 'Receitas',  enabled: false, style: { color: 'green' } }
            } ],

            series: [
            {
                name: 'Despesas', type: 'column', color: '#e60000', data: costData
            },
            {
                name: 'Receitas', type: 'spline', color: '#009933', data: revenueData
            } ],
            credits: [ { enabled: false } ]
        } );
	};

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	function init()
	{
		PostingService.getMapMonth( function( items )
		{
            items.forEach( function( item )
            {
            	categories.push( "Dia " + new Date( item._id.date ).getDate() );

            	if ( item._id.type === 'Despesa' )
            	{
        			var last = revenueData.slice( -1 );

            		costData.push( parseFloat( item.sum ) + parseFloat( last.length ? last[0] : 0 ) );
            	}
            	
            	if ( item._id.type === 'Receita' )
            	{
            		var last = revenueData.slice( -1 );

            		revenueData.push( parseFloat( item.sum ) + parseFloat( last.length ? last[0] : 0 ) );
            	}
            } );

            refreshGraphic();
		} );
	};

	init();

} ] );