angular.module( 'Strom' ).controller( 'AnalysisController', ['$scope', 'PostingService', 'CategoryService',
												   function ( $scope, PostingService, CategoryService )
{
	$scope.postings =[];
	$scope.categories =[];
	
	function loadChart()
	{
		Highcharts.setOptions( { lang: { drillUpText: '◁ Voltar para {series.name}' } } );
    	
    	var serie = [ { name: 'Despesa', y: " +   cost  + ", color: 'red', drilldown: 'cost' },
                  	  { name: 'Receita', y: " + revenue + ", color: 'green', drilldown: 'revenue' } ];

        $('#drilldown').highcharts(
        {
            chart: { type: 'column', backgroundColor: '#ECEFF1' },

            title: { text: 'Lançamentos da Categoria' , style: { fontWeight: 'bold', color: "#607D8B" } },

            subtitle: { text: 'Quantidade de lançamentos por Situação', style: { color: "#607D8B" }  },

            xAxis: [ { type: 'category' } ],

            yAxis: [ { title: { text: 'Quantidade', style: { fontWeight: 'bold', color: "#607D8B" } } } ],

            legend: { enabled: false },

            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true, format: '{point.y:.0f}' } } },

            tooltip: { headerFormat: '<span style="font-size:11px">{series.name}</span><br>', 
                       pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}' +'</b><br/>' },

            series: [{ 
                    name: 'Lançamentos', colorByPoint: true,
                    data: serie 
                } ],
            drilldown: {
            series: drilldownSeries
            },
            credits: [ { enabled: false } ]
        } );
	};

	function init()
	{
		PostingService.filterPosting( {} , function( data )
        {
            $scope.postings = data;
        } );

        CategoryService.getCategories( function( data )
        {
        	$scope.categories = data;
        } );
	};

	init();
} ] );