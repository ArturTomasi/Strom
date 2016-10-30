angular.module( 'Strom' ).controller( 'AnalysisController', [ '$q', '$scope', 'PostingService', 'CategoryService',
												                          function ( $q, $scope, PostingService, CategoryService )
{

function showTab( name )
{
		
		$( '#' + name ).attr( 'class', 'tab-pane active' );
}

		$( 'li' ).click( function ()
		{
				$( '#' + $( this ).attr( "name" ) ).attr( 'class', 'ta' )
		});
    var sumCosts   = 0,
        sumRevenues = 0,
        revenues          = 0,
        costs             = 0,
        postings          = [],
        categories        = [],
        costsCategories   = [],
        finCostsCategories   = [],
        postingCategories = [],
        finRevenueCategories = [],
        revenueCategories = [],
        revenueData       = [],
        categoriesMonth   = [],
        costData          = [];

    $scope.monthHome = new Date( moment().startOf( 'month' ) );

    $scope.$watch( 'monthHome', function( newValue, oldValue )
    {
        if ( newValue && ( newValue > oldValue || newValue < oldValue ) )
        {
            loadPostingMonth();
        }
    } );

    $scope.$watch( 'monthDrilldown', function( newValue, oldValue )
    {
        if ( !oldValue || ( newValue && ( newValue > oldValue || newValue < oldValue ) ) )
        {
            init();
        }
    } );

    $scope.refresh = function( tab )
    {
        $scope.tabActive = tab

        setTimeout( function()
        {
            if ( tab === 'costsTab' )
              $( '#homeChart' ).highcharts().reflow();

            if ( tab === 'drilldownTab' )
              $( '#drilldown' ).highcharts().reflow();

          if ( tab === 'categoryTab' )
              $( '#categoryDrill' ).highcharts().reflow();

        }, 200 );
    }

    function loadChartCategory()
    {
        Highcharts.setOptions( { lang: { drillUpText: '◁ Voltar para {series.name}' } } );

        var serie = [ { name: 'Despesa', y: sumCosts,    color: 'red',   drilldown: 'cost' },
                      { name: 'Receita', y: sumRevenues, color: 'green', drilldown: 'revenue' } ];

        var  drilldown = [ { id: 'cost',    name: 'Despesa', data : finCostsCategories },
                           { id: 'revenue', name: 'Receita', data : finRevenueCategories } ];

        $('#categoryDrill').highcharts(
        {
            chart: { type: 'pie', backgroundColor: '#ECEFF1' },

            title: { text: 'Lançamentos da Categoria' , style: { fontWeight: 'bold', color: "#607D8B" } },

            subtitle: { text: 'Acumulado de lançamentos por tipo', style: { color: "#607D8B" }  },

            xAxis: [ { type: 'category' } ],

            yAxis: [ { title: { text: 'Acumulado', style: { fontWeight: 'bold', color: "#607D8B" } } } ],

            legend: { enabled: false },

            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true, format: '{point.name}: R$ {point.y:.2f}' } } },

            tooltip: { headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                       pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>R$ {point.y:.2f}' +'</b><br/>' },

            series: [{
                    name: 'Lançamentos', colorByPoint: true,
                    data: serie
                } ],
            drilldown: {
            series: drilldown
            },
            credits: [ { enabled: false } ],
            exporting:
            {
                buttons: { contextButton: { menuItems: null, symbol: null, text: "Download", onclick: function () { this.exportChart(); } } },
                chartOptions: { plotOptions: { series: { dataLabels: { enabled: true } } } },
                scale: 3,
                fallbackToExportServer: false
            }
        } );
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
            credits: [ { enabled: false } ],
            exporting:
            {
                buttons: { contextButton: { menuItems: null, symbol: null, text: "Download", onclick: function () { this.exportChart(); } } },
                chartOptions: { plotOptions: { series: { dataLabels: { enabled: true } } } },
                scale: 3,
                fallbackToExportServer: false
            }
        } );
  	};

    /**
     * [refreshGraphic description]
     * @return {[type]} [description]
     */
    function refreshGraphic()
    {
        var monthName = moment( $scope.monthHome ).locale( 'pt-br' ).format( 'MMMM' ) + " / " + $scope.monthHome.getFullYear();

        $( '#homeChart' ).highcharts(
        {
            chart:    { backgroundColor: '#ECEFF1' },
            title:    { text: 'Balanço Mensal - ' + monthName, style: { fontWeight: 'bold', color: "#607D8B" } },
            subtitle: { text: 'Acumulado dos lançamentos finalizados do mês de ' + monthName + " (por dia)", style: { color: "#607D8B" } },
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
            credits: [ { enabled: false } ],
            exporting:
            {
                buttons: { contextButton: { menuItems: null, symbol: null, text: "Download", onclick: function () { this.exportChart(); } } },
                chartOptions: { plotOptions: { series: { dataLabels: { enabled: true } } } },
                scale: 3,
                fallbackToExportServer: false
            }
        } );
    };

    /**
     * [loadPostingMonth description]
     * @return {[type]} [description]
     */
    function loadPostingMonth()
    {
        PostingService.getMapMonth( $scope.monthHome, function( items )
        {
            categoriesMonth = new Array();
            costData = new Array();
            revenueData = new Array();

            items.forEach( function( item, i )
            {
                categoriesMonth.push( "Parcela " + i );

                if ( item._id.type === 'Despesa' )
                {
                    var last = costData.slice( -1 );

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
    }

    /**
     * [loadDataChart description]
     * @return {[type]} [description]
     */
    function loadDataChart()
    {
        if ( $scope.monthDrilldown )
        {
            var start =  new Date( moment( $scope.monthDrilldown ).startOf( 'month' ) );
            var end =  new Date( moment( $scope.monthDrilldown ).endOf( 'month' ) ) ;
        }

        finCostsCategories   = new Array();
        finRevenueCategories = new Array();
        revenueCategories    = new Array();
        costsCategories      = new Array();

        categories.forEach( function( category )
        {
            var registred = 0,
                finished  = 0,
                progress  = 0,
                cost      = 0,
                revenue   = 0,
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

                    var date = new Date( p.realDate );

                    if ( !start || ( start &&  date >= start && date <= end ) )
                    {
                        if ( p.type === 'Despesa' )
                        {
                            cost += p.realValue || 0;
                        }
                        else
                        {
                            revenue += p.realValue || 0;
                        }
                    }

                    return true;
                }

            } );

            postingCategories.push( { id: category._id, name: category.name, data :
            [
              { name: 'Cadastrados',  y: registred , color: '#3364c8' },
              { name: 'Em Andamento', y: progress  , color: '#ded604' },
              { name: 'Excluidos',    y: deleted   , color: '#d82027' },
              { name: 'Finalizados',  y: finished  , color: '#408c1b' }
            ] } );


            if ( category.type === 'Despesa' )
            {
                costsCategories.push( { name: category.name, y: count.length, drilldown: category._id } );

                if ( cost && cost > 0 )
                {
                    finCostsCategories.push( { name: category.name, y: cost } );
                }
            }

            else
            {
                revenueCategories.push( { name: category.name, y: count.length, drilldown: category._id } );

                if ( revenue && revenue > 0 )
                {
                    finRevenueCategories.push( { name: category.name, y: revenue } );
                }
            }
        } );
    }

    /**
     * [loadPostings description]
     * @return {[type]} [description]
     */
    function loadPostings()
    {
        if ( $scope.monthDrilldown )
        {
            var start =  new Date( moment( $scope.monthDrilldown ).startOf( 'month' ) );
            var end =  new Date( moment( $scope.monthDrilldown ).endOf( 'month' ) ) ;
        }

        PostingService.filterPosting( {} , function( data )
        {
            postings = data;

            costs = 0; revenues = 0;
            sumRevenues = 0; sumCosts = 0;

            postings.forEach( function( posting )
            {
                var date = new Date( posting.realDate );

                var inInterval = !start || ( start && date >= start && date <= end );

                if ( posting.type === 'Despesa' )
                {
                    costs++;

                    if ( inInterval ) sumCosts += posting.realValue || 0.0;
                }

                else
                {
                    revenues++;

                    if ( inInterval ) sumRevenues += posting.realValue || 0.0;
                }
            } );
        } );
    }

    /**
     * [init description]
     * @return {[type]} [description]
     */
  	function init()
  	{
        $q.all(
        [
  		    loadPostings(),

            CategoryService.getCategories( function( data )
            {
                categories = data;
            } ),

            loadPostingMonth()

        ] ).then( function()
        {
            loadDataChart();

            loadChart();

            loadChartCategory();
        } );
      }

      init();
} ] );
