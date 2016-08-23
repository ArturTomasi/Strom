/* global module */

module.exports = function ( app ) 
{
    var _TYPES = 
    {
        POSTING:    0,
        USER:       1,
        CATEGORY:   2,
        COMPLETION: 3,
        ENTITY:     4
    };

    var _postings = [];

    var FilterController = {};

    /**
     * [getFilter description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    FilterController.getFilter = function( req, res )
    {
        var type = req.params.type;

        if( type == _TYPES.POSTING )
        {
            res.json( _postings );
        }

        else
        {
            res.status(500).json( "FILTER NOT FOUND" );
        }
    };

    /**
     * [makePostingFilter description]
     * @return {[type]} [description]
     */
    makePostingFilter = function()
    {
        var _STATES = 
        [
            { name: "Registrado",   id: 0 },
            { name: "Em Andamento", id: 1 },
            { name: "Finalizado",   id: 2 },
            { name: "Deletado",     id: 3 }
        ];
            
        _postings = 
        [
            { name: "name", label: "Nome", type: "input" },
            { name: "state", label: "Situação", type: "list", items: _STATES },
            { name: "estimateDate", label: "Data Estimada", type: "date" }
        ];
    };

    /**
     * [initFilters description]
     * @return {[type]} [description]
     */
    initFilters = function()
    {
        makePostingFilter();
    };

    initFilters();

    return FilterController;
};

