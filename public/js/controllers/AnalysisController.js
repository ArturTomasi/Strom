angular.module( 'Strom' ).controller( 'AnalysisController', [ '$q', '$scope', 'PostingService', 'CategoryService',
												                          function ( $q, $scope, PostingService, CategoryService )
{
    var revenues          = 0, 
        costs             = 0, 
        postings          = [], 
        categories        = [], 
        costsCategories   = [],
        postingCategories = [],
        revenueCategories = [],
        revenueData       = [],
        categoriesMonth   = [], 
        costData          = [];

     $scope.refresh = function( tab )
     {
        $scope.tabActive = tab

        setTimeout( function()
        {
            if ( tab === 'costsTab' )
              $( '#homeChart' ).highcharts().reflow();
              Highcharts.charts[0].reflow();
            
            if ( tab === 'drilldownTab' )
              $( '#drilldown' ).highcharts().reflow();

        }, 200 );
     }

  	function loadChart()
  	{
        Highcharts.setOptions( { lang: { drillUpText: '◁ Voltar para {series.name}' } } );
      	
      	var serie = [ { name: 'Despesa', y: costs,    color: 'red',   drilldown: 'cost' },
                      { name: 'Receita', y: revenues, color: 'green', drilldown: 'revenue' } ];

        var  drilldown = [ { id: 'cost',    name: 'Despesa', data : costsCategories },
                           { id: 'revenue', name: 'Receita', data : revenueCategories } ];

        postingCategories.forEach( function ( p ) { drilldown.push( p ); } );

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
            series: drilldown
            },
            credits: [ { enabled: false } ]
        } );
  	};

    /**
     * [refreshGraphic description]
     * @return {[type]} [description]
     */
    function refreshGraphic()
    { 
        $( '#homeChart' ).highcharts(
        {
            chart:    { backgroundColor: '#ECEFF1' },
            title:    { text: 'Balanço Mensal - ' + moment().locale( 'pt-br' ).format( 'MMMM' ), style: { fontWeight: 'bold', color: "#607D8B" } },
            subtitle: { text: 'Acumulado dos lançamentos finalizados do mês de ' + moment().locale( 'pt-br' ).format( 'MMMM' ) + " (por dia)", style: { color: "#607D8B" } },
            tooltip:  { shared: true, pointFormat: '{series.name}: <b>R$ {point.y:,.2f}</b><br/>' },
            legend:   { layout: 'horizontal', align: 'center', verticalAlign: 'bottom', floating: false, backgroundColor: 'transparent' },

            xAxis: [ { categories: categoriesMonth, crosshair: true } ],
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
        $q.all( 
        [
      		  PostingService.filterPosting( {} , function( data )
            {
                postings = data;

                costs = 0; revenues = 0;

                postings.forEach( function( posting )
                {
                    if ( posting.type === 'Despesa' )
                    {
                        costs++;
                    }

                    else
                    {
                       revenues++;
                    }
                } );
            } ),

            CategoryService.getCategories( function( data )
            {
                categories = data;
            } ),
        
            PostingService.getMapMonth( function( items )
            {
                items.forEach( function( item )
                {
                    categoriesMonth.push( "Dia " + new Date( item._id.date ).getDate() );

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
            } )

        ] ).then( function() 
        {
            categories.forEach( function( category )
            {
                var registred = 0, 
                    finished  = 0, 
                    progress  = 0, 
                    deleted   = 0;

                var count = postings.filter( function( p )
                {
                    if ( p.category === category._id )
                    {
                        switch( p.state )
                        {
                            case 0: registred++; break;
                            case 1: progress++;  break;
                            case 2: finished++;  break;
                            case 3: deleted++;   break;
                        }
                      
                        return true;  
                    }
                    
                } );

                postingCategories.push( { id: category._id, name: category.name, data : 
                [ 
                  { name: 'Cadastrados',  y: registred , color: '#3364c8', drilldown: null }, 
                  { name: 'Em Andamento', y: progress  , color: '#ded604', drilldown: null }, 
                  { name: 'Excluidos',    y: deleted   , color: '#d82027', drilldown: null }, 
                  { name: 'Finalizados',  y: finished  , color: '#408c1b', drilldown: null } 
                ] } );


                if ( category.type === 'Despesa' )
                {
                    costsCategories.push( { name: category.name, y: count.length, drilldown: category._id } );
                }

                else
                {
                    revenueCategories.push( { name: category.name, y: count.length, drilldown: category._id } );
                }
            } );

            loadChart();
          } );
      }

	    init();
} ] );
