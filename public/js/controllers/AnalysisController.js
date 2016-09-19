angular.module( 'Strom' ).controller( 'AnalysisController', ['$scope', 'PostingService', 'CategoryService',
												   function ( $scope, PostingService, CategoryService )
{
  var revenues = [], costs = [], postings = [], categories = [];


	function loadChart()
	{
		  Highcharts.setOptions( { lang: { drillUpText: '◁ Voltar para {series.name}' } } );
    	
    	var serie = [ { name: 'Despesa', y: costs.length, color: 'red', drilldown: 'cost' },
                  	{ name: 'Receita', y: revenues.length, color: 'green', drilldown: 'revenue' } ];

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
          series: getDrilldownSeries()
          },
          credits: [ { enabled: false } ]
      } );
	};

    /**
     * [getDrilldownSeries description]
     * @return {[type]} [description]
     */
    function getDrilldownSeries()
    {
        return 
        [ 
          { id: 'cost',    name: 'Despesa', data : [ { name: "Receita",  y: revenues.length, drilldown: 1 } ] },
          { id: 'revenue', name: 'Receita', data : [ { name: "Despesas", y: costs.length,    drilldown: 0 } ] },

        ];
    };

    /**
     * [init description]
     * @return {[type]} [description]
     */
  	function init()
  	{
  		  PostingService.filterPosting( {} , function( data )
        {
            postings = data;

            postings.map( function( posting ) 
            {
                if ( posting.type === 'Despesa' )
                {
                    costs.push( posting );
                }

                else
                {
                    revenues.push( posting );
                }

            } );

            loadChart();

        } );

        CategoryService.getCategories( function( data )
        {
        	$scope.categories = data;
        } );
  	};

  	init();
} ] );