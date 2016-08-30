/* global module */

module.exports = function ( app ) 
{
    var Posting = app.models.Posting;
    var sanitize = require( 'mongo-sanitize' );
    
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
        Posting.find().sort( 'estimateDate').exec( function ( error , postings )
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
          Posting.find( query ).sort( 'estimateDate' ).exec( function ( error , postings )
          {
              if ( error )
              {
                  res.status( 500 ).json( error );
              }
              
              res.json( postings );
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
            Posting.create( posting, function( error, posting )
            {
                if ( error )
                {
                    res.status( 500 ).json( error );
                }
                
                res.json( posting );
                
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
          Posting.findOneAndUpdate( { _id : _id }, posting, 
                                 { new : true, runValidators: true, context: 'query' } ).exec( function ( error, posting )
          {
              if ( error )
              {
                  res.status( 500 ).json( composeError( error ) );
              }

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
                                      { new : true, runValidators: true, context: 'query' } ).exec( function ( error, posting )
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
     * [validate description]
     * @param  {[type]} posting [description]
     * @return {[type]}         [description]
     */
    function validate( posting, mode )
    {
        var errors = '';

        var notFinish = mode != MODE_FINISH;

        if( notFinish && ! posting.estimateDate )
            errors += "A data estimada não pode estar vazia !<br>";

        if( notFinish && ! posting.estimateValue )
            errors += "O valor estimado está inválido !<br>";

        if( ! posting.name )
            errors += "O Nome não pode estar vazio!";

        if( ( posting.completionAuto || ! notFinish ) && ! posting.completionType )
            errors += "O tipo de finalização não pode estar vazio!<br>";

        if( posting.realDate && ! posting.completionType )
            errors += "O tipo de finalização não pode estar vazio<br>";

        if( notFinish && ! posting.entity )
            errors += "A empresa do lançamento não pode estar vazio!<br>";

        if( notFinish && ! posting.user )
            errors += "A responsável do lançamento não de estar vazio!<br>";

        if( notFinish && ! posting.category )
            errors += "A categoria do lançamento não pode estar vazio!<br>";

        if( ! notFinish && ! posting.realValue  )
            erros += "O valor real não pode estar vazia!<br>";

        if( ! notFinish && ! posting.realDate )
            errors += "A data real não pode estar vazia!<br>";

        if( notFinish && posting.realDate && ! posting.realValue )
            errors += "A valor real não pode ser 0!<br>";

        if( notFinish && posting.realValue && ! posting.realDate )
            errors += "A data real não pode estar vazia<br>!";

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

        posting.completionAuto = posting.completionAuto.value;
        
    };

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
                  case 'estimateDate': where = { estimateDate : {"$gte": condition.from, "$lt": condition.until } }; break;
                  case 'realDate': where = { realDate : { $get : condition.from, $lte: condition.until } }; break;
                  case 'realValue': where = { realValue : condition }; break;
                  case 'estimateValue': where = { estimateValue : condition }; break;
                  case 'user': where = { user : condition }; break;
                  case 'entity': where = { entity : condition }; break;
                  case 'category': where = { category : condition }; break;
                  case 'completionType': where = { completionType : condition }; break;
                  case 'deadline': 
                  {
                    if ( ! condition.id )
                    {
                        where = { $where : function() 
                        {
                            var estimate = this.estimateDate;
                            var real     = this.realDate;

                            var estTime = new Date( estimate.getYear(), estimate.getMonth(), estimate.getDay() ).getTime();

                            if ( ! real && estTime >= Date.now() )
                            {
                                return true;
                            }

                            if( real && estTime >=  new Date( real.getYear(), real.getMonth(), real.getDay() ).getTime() )
                            {
                              return true;
                            } 

                            return false;
                        } }; 
                    }

                    else
                    {
                      where = { $where : function() 
                      {
                          var estimate = this.estimateDate;
                          var real     = this.realDate;

                          var estTime = new Date( estimate.getYear(), estimate.getMonth(), estimate.getDay() ).getTime();

                          if ( ! real && estTime < Date.now() )
                          {
                              return true;
                          }

                          if( real && estTime < new Date( real.getYear(), real.getMonth(), real.getDay() ).getTime() )
                          {
                            return true;
                          } 

                          return false;
                      } }; 
                    }
                  }
                  break;
                  
                  case 'inBudget': where = { $where : 'this.estimateValue' + ( condition.id ? '>' : '<' ) + 'this.realValue' } ; break;                 
              }

              console.log( condition );
              console.log( where );

              conditions.$or.push( where );
            } );
        };
 
        query.$and.push( conditions );

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
                    msg +=  '<br>' + 'Nome (' + error.value + ') ' +  error.message;
                break;
            }
        }
        
        return msg;
    };
    
    return controller;
};

