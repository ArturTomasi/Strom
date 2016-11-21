/* global module */
module.exports = function ( app )
{
    var Posting = app.models.Posting;
    var sanitize = require( 'mongo-sanitize' );
    var MyReport = require( '../utils/MyReport.js' )( app );
    var Mail     = require( '../utils/PostingMail.js' );

    var moment   = require( 'moment' );

    /**
     * @type type
     */
    var controller = {};

    var MODE_NEW    = 0;
    var MODE_EDIT   = 1;
    var MODE_FINISH = 2;

    var STATE_REGISTRED = 0;
    var STATE_PROGRESS  = 1;
    var STATE_FINISHED  = 2;
    var STATE_DELETED   = 3;


   /**
    *
    * @param {type} req
    * @param {type} res
    * @returns {undefined}
    */
    controller.getPostings = function( req, res )
    {
        Posting.find( { user: req.user } ).sort( 'estimateDate').exec( function ( error , postings )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( postings );
        } );
    };

    /**
     * [getPostingFiltered description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.getPostingFiltered = function( req, res )
    {
        var query = composeFilter( req.body );

        if ( query )
        {
            Posting.find( query )
            .sort( 'estimateDate' )
            .exec( function ( error , postings )
            {
                if ( error )
                {
                    res.status( 500 ).json( error );
                }

                res.status(200).json( postings );
            } );
        }

        else
        {
          controller.getPostings( req, res );
        }
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.getPosting = function( req, res )
    {
        var id = sanitize( req.params.id );

        Posting.findById( { _id : id } ).exec( function ( error, posting )
        {
            if ( error )
            {
                res.status( 500 ).json( composeError( error ) );
            }

            res.json( posting );
        } );
    };

    /**
     * [getPostingAgenda description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.getPostingAgenda = function( req, res )
    {
        Posting.find(
        {
            $and: [
                    { $or : [ { state: { $ne : STATE_DELETED } } ] },
                    { $or : [ { state: STATE_PROGRESS }, { estimateDate : { $gte: moment(), $lte: moment().add( 1, 'month' ) } } ] },
                    { $or : [ { user:  req.user } ] }
                  ]
        } )
        .sort( 'estimateDate' )
        .exec( function( error, postings )
        {
             if ( error ) res.status( 500 ).json( error );

             res.status( 200 ).json( postings );
        } );
    };

    /**
     * [getMapMonth description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.getMapMonth = function( req, res )
    {
        var month = req.body.month;

        var start =  new Date( moment( month ).startOf( 'month' ) );
        var end =  new Date( moment( month ).endOf( 'month' ) ) ;

        Posting.aggregate()
        .match(
        {
            realDate:{
                       $exists: true,
                       $gte: start,
                       $lte: end
                     },
            state : { $ne : STATE_DELETED },
            user  : req.user._id
        } )

        .group(
        {
            _id:   { type: "$type", date: '$realDate' },
            sum :  { $sum: "$realValue" },
            count: { $sum: 1 }
        } )
        .sort( 'realDate' )
        .exec( function( error, data )
        {
            if ( error ) res.status( 500 ).json( error );

            res.status( 200 ).json( data );
        } );
    };

    /**
     * [getProgress description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.getProgress = function( req, res )
    {
        Posting.aggregate()

        .match(
        {
            state : { $ne : STATE_DELETED },
            user  : req.user._id
        } )

        .group(
        {
            _id:           "$type",
            realValue:     { $sum: "$realValue" },
            estimateValue: { $sum: "$estimateValue" },
            count:         { $sum: 1 }
        } )

        .sort( 'type' )

        .exec( function( error, data )
        {
            if ( error ) res.status( 500 ).json( error );

            res.status( 200 ).json( data );

        } );
    }

    /**
     * [getHistory description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.getHistory = function( req, res )
    {
        Posting.aggregate()

        .match(
        {
            realDate: { $exists: true },
            state : STATE_FINISHED,
            user  : req.user._id
        } )

        .group(
        {
            _id:
            {
                year:  { $year: '$realDate' },
                month: { $month: "$realDate" },
                type : "$type"
            },
            realValue:{ $sum: "$realValue" }
        } )

        .sort( 'type' )

        .exec( function( error, data )
        {
            if ( error ) res.status(500).json( error );

            res.status( 200 ).json( data );
        } );
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.addPosting = function( req , res )
    {
        var posting = req.body;

        makeState( posting );

        var errors = validate( posting, MODE_NEW );

        if ( ! errors )
        {
            var values = createPortions( posting );

            Posting.create( posting, function( error, posting )
            {
                if ( error )
                {
                    res.status( 500 ).json( error );
                }

                if ( values )
                {
                    defineId( posting._id, values );

                    Posting.create( values, function( error, portions )
                    {
                        if ( error )
                        {
                            res.status( 500 ).json( error );
                        }

                        res.status( 200 ).json( portions );
                    } );
                }

                else
                {
                    res.status( 200 ).json( posting );
                }
            } );
        }

        else
        {
            res.status( 500 ).json( errors );
        }
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.editPosting = function( req , res )
    {
        var _id = sanitize( req.body._id );

        var posting = req.body;

        makeState( posting );

        var errors = validate( posting, MODE_EDIT );

        if ( ! errors )
        {
          Posting.findOneAndUpdate( { _id : _id },
                                    posting,
                                    { new : true, runValidators: true, context: 'query' } )
          .exec( function ( error, posting )
          {
              if ( error )
              {
                  res.status( 500 ).json( composeError( error ) );
              }

              if ( posting.portion < posting.portionTotal )
              {
                 Posting.findOneAndUpdate( {
                                              posting : ( posting.portion === 1 ? posting._id : posting.posting ),
                                              state   : ( posting.state === STATE_FINISHED ? STATE_REGISTRED : STATE_PROGRESS ),
                                              portion : { $gt: posting.portion, $lt: posting.portionTotal + 1 }
                                            },
                                            {
                                              state : ( posting.state === STATE_FINISHED ? STATE_PROGRESS : STATE_REGISTRED ),
                                              $unset : { realDate : 1, realValue : 1 }
                                            },
                                            { new : true, runValidators: true, context: 'query' } )
                  .exec( function ( error, posting )
                  {
                      if ( error )
                      {
                          res.status( 500 ).json( composeError( error ) );
                      }

                      res.status( 200 ).json( posting );

                  } );
              }

              new Mail( app ).sendPosting( posting );

              res.status( 200 ).json( posting );
          } );
        }

        else
        {
          res.status( 500 ).json( errors );
        }
    };

    /**
     *
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    controller.deletePosting = function( req , res )
    {
        if ( req.params.id )
        {
            var _id = sanitize( req.params.id );

            Posting.findOneAndUpdate( { _id : _id },
                                      { state: STATE_DELETED },
                                      { new : true, runValidators: true, context: 'query' } )
            .exec( function ( error, posting )
            {
                if ( error )
                {
                    res.status( 500 ).json( composeError( error ) );
                }

                res.status( 200 ).json( posting );
            } );
        }
    };

    /**
     * [printPosting description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.printPosting = function( req, res )
    {
        var _query = composeFilter( req.body );

        if ( _query )
        {
            Posting.find( _query )
            .populate( 'user', 'name' )
            .populate( 'category', 'name' )
            .populate( 'entity', 'name' )
            .populate( 'completionType', 'name' )
            .sort( 'estimateDate' )
            .exec( function ( error , _postings )
            {
                if ( error ) res.status( 500 ).json( error );

                MyReport.setShortId( _postings.length > 1 ? 'SyAWzKXn' : 'SyMXDMQ2' );
                MyReport.setData( _postings.length > 1 ? _postings : _postings[0] );

                MyReport.generate( function( base64 )
                {
                    res.status( 200 ).json( base64 );
                } );

            } );
        }
    };

    /**
     * [printXLS description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.printXLS = function( req, res )
    {
      var _query = composeFilter( req.body );

      if ( _query )
      {
          Posting.find( _query )
          .populate( 'user', 'name' )
          .populate( 'category', 'name' )
          .populate( 'entity', 'name' )
          .populate( 'completionType', 'name' )
          .sort( 'estimateDate' )
          .exec( function ( error , _postings )
          {
              if ( error ) res.status( 500 ).json( error );

              MyReport.setShortId( 'r1nK69Xgx' );
              MyReport.setData( _postings );

              MyReport.generate( function( base64 )
              {
                  res.status( 200 ).json( base64 );
              } );

          } );
      }
    };

    /**
     * [sendPosting description]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    controller.sendPosting = function( req, res )
    {
        var wrapper = req.body;

        var email = new Mail( app );

        email.setSubject( wrapper.email.subject );
        email.setTo( wrapper.email.to );
        email.setContent( wrapper.email.content );
        email.sendPosting( wrapper.posting );

        res.status( 200 ).json( { ok : 'ok' } );
    }

    /**
     * [createPortions description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function createPortions( posting )
    {
        if ( posting && posting.values )
        {
            var _values   = clone( posting.values );

            delete posting.values;

            posting.portionTotal = _values.length + 1;

            var _postings = [];

            _values.forEach( function ( _portion, _index )
            {
                var _copy = clone( posting );

                _copy.state = STATE_REGISTRED;
                _copy.estimateDate = _portion.estimateDate;
                _copy.estimateValue = _portion.estimateValue;
                _copy.portion = ( _index + 2 );
                _copy.postionTotal = posting.portionTotal;
                _copy.posting = posting._id;

                delete _copy.attachments;
                delete _copy.realDate;
                delete _copy.realValue;

                if ( posting.category && posting.category.type )
                          _copy.type =  _copy.category.type;

                _postings.push( _copy );
            } );

            if (  _postings && posting.state !== STATE_PROGRESS )
            {
                _postings[ 0 ].state = STATE_PROGRESS;
            }
        }

        return _postings;
    };

    /**
     * [defineId description]
     * @param  {[type]} _id    [description]
     * @param  {[type]} values [description]
     * @return {[type]}        [description]
     */
    function defineId( _id, values )
    {
      if ( _id && values )
      {
          values.forEach( function( value )
          {
              value.posting = _id;
          } );
      }
    };

    /**
     * [validate description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validate( posting, mode )
    {
        var errors = '';

        var notFinish = mode != MODE_FINISH;

        if( posting.portionTotal > 12 || posting.portionTotal < 1 )
            errors += "As parcelas do lançamento devem ser entre 1 e 12";

        if( notFinish && ! posting.estimateDate )
            errors += "A data estimada não pode estar vazia !\n";

        if( notFinish && ! posting.estimateValue )
            errors += "O valor estimado está inválido !\n";

        if( ! posting.name )
            errors += "O Nome não pode estar vazio!";

        if( ( posting.completionAuto || ! notFinish ) && ! posting.completionType )
            errors += "O tipo de finalização não pode estar vazio!\n";

        if( posting.realDate && ! posting.completionType )
            errors += "O tipo de finalização não pode estar vazio\n";

        if( notFinish && ! posting.entity )
            errors += "A empresa do lançamento não pode estar vazio!\n";

        if( notFinish && ! posting.user )
            errors += "A responsável do lançamento não de estar vazio!\n";

        if( notFinish && ! posting.category )
            errors += "A categoria do lançamento não pode estar vazio!\n";

        if( ! notFinish && ! posting.realValue  )
            erros += "O valor real não pode estar vazia!\n";

        if( ! notFinish && ! posting.realDate )
            errors += "A data real não pode estar vazia!\n";

        if( notFinish && posting.realDate && ! posting.realValue )
            errors += "A valor real não pode ser 0!\n";

        if( notFinish && posting.realValue && ! posting.realDate )
            errors += "A data real não pode estar vazia\n!";

        if ( errors ) return errors;
    };

    /**
     * [makeState description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function makeState( posting )
    {
        posting.state =  posting.realDate ? STATE_FINISHED : STATE_PROGRESS;

        posting.completionAuto = posting.completionAuto ? posting.completionAuto.value : false;

        if ( posting.category && posting.category.type )
            posting.type =  posting.category.type;
    }

    /**
     * [composeFilter description]
     * @param  {[type]} filters [description]
     * @return {[type]}         [description]
     */
    function composeFilter( filters )
    {
        var query = {};

        if ( Object.keys( filters ).length === 0) return {}; //valid empty conditions

        query.$and = [];

        for( var filter in filters )
        {
            var values = filters[ filter ];

            var conditions = {};

            conditions.$or = [];

            values.forEach( function( condition )
            {
              var where;

              switch( filter )
              {
                  case 'name': where = { name : new RegExp( '.*' + condition + '.*' , "i" ) }; break;
                  case 'state': where = { state : condition.id }; break;
                  case 'estimateDate': where = { estimateDate : { $gte: condition.from, $lte: condition.until } }; break;
                  case 'realDate': where = { realDate : { $gte : condition.from, $lte: condition.until } }; break;
                  case 'realValue': where = { realValue : condition }; break;
                  case 'estimateValue': where = { estimateValue : condition }; break;
                  case 'user': where = { user : condition }; break;
                  case 'entity': where = { entity : condition }; break;
                  case 'category': where = { category : condition }; break;
                  case 'completionType': where = { completionType : condition }; break;
                  case 'type': where = { type : condition.id }; break;
                  case '_id': where = { _id : condition }; break;
                  case 'deadline':
                  {
                    if ( ! condition.id )
                    {
                        where = { $where : function()
                        {
                            if ( ! this.realDate )
                            {
                                return Date.parse( this.estimateDate ) >= Date.now();
                            }

                            return Date.parse( this.estimateDate ) >= Date.parse( this.realDate );
                        } };
                    }

                    else
                    {
                        where = { $where : function()
                        {
                            if ( ! this.realDate )
                            {
                                return Date.parse( this.estimateDate ) < Date.now();
                            }

                            return Date.parse( this.estimateDate ) < Date.parse( this.realDate );
                        } };
                    }
                  }
                  break;

                  case 'inBudget': where = { $where : 'this.estimateValue' + ( condition.id ? '>' : '<' ) + 'this.realValue' } ; break;
                }

                conditions.$or.push( where );
            } );

            query.$and.push( conditions );
        };

        return query;
    };

    /**
     *
     * @param {type} errors
     * @returns {unresolved}
     */
    function composeError( errors )
    {
        var msg = '';

        for ( var e in errors.errors )
        {
            var error =  errors.errors[e];

            switch ( error.path )
            {
                case 'name':
                    msg +=  '\n' + 'Nome (' + error.value + ') ' +  error.message;
                break;
            }
        }

        return msg;
    };

    clone = function( _original )
    {
        return JSON.parse( JSON.stringify( _original ) );
    };

    return controller;
};
