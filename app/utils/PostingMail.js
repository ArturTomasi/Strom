module.exports = function ( app ) 
{
    var Mail = require( './MyMail.js' )();

    var Posting = app.models.Posting,
        _to, 
        _subject = 'Strom: Lançamento',
        _content;
    
    var PostingMail = {};

    PostingMail.setTo = function( to )
    {
        _to = to;
    }
     
    PostingMail.setSubject = function( subject )
    {
        _subject = subject;
    }  

    PostingMail.setContent = function( content )
    {
        _content = content;
    }

    PostingMail.sendPosting = function( posting )
    {  
        Posting.find( { _id: posting._id } )
        .populate( 'user' )
        .populate( 'category' )
        .populate( 'entity' )
        .populate( 'completionType' )
        .exec( function( error, _postings )
        {
            if ( ! error )
            {
                _posting = _postings[0];

                _user = _posting.user;

                Mail.setSubject( _subject );

                var _body = _generateBody( _posting );

                if ( _content )
                {
                    _body = '<div style="width: 100%">' +
                                _content +
                            '</div>' +
                            '<hr>' +
                            _body;
                }

                Mail.setHtml( _body );      
                
                Mail.setTo( _to ? _to : _user.name, 
                            _to ? _to : _user.email );
                
                _posting.attachments.map( function( file )
                {
                    Mail.addAttachment( file.name, file.base64 );
                } );

                Mail.send();
            } 

            
        } );
    };

    function _generateBody( posting )
    {
        return '<html>' +
        '<head>' +
            '<meta charset="UTF-8">' +
            '<style>' +
                'body { background-color: #ECEFF1;  height: 100%;  overflow: hidden; }' +
                '.field {' +
                    'font-weight: bolder;' +
                    'color: #263238;'+
                    'padding: 5px 15px 5px 20px;'+
                    'width: 20%;'+
                    'border-radius: 10px;' +
                    'background: #90A4AE;'+
                    'font-size: 12px;' +
                '}'+
                '.value {'+
                  'padding: 8px;' +
                  'color: #37474F;' +
                  'font-weight: bolder;' +
                  'border-radius: 10px;' +
                  'background: #CFD8DC;' +
                  'font-size: 12px;'+
                  'width: 80%;'+
                '}'+
                '.head {'+
                  'padding: 10px 10px 0px 10px;'+
                  'font-size: 25px;'+
                  'text-align: left;'+
                  'color: #37474F;' +
                  'font-weight: bolder;' +
                  'width: 100%;' +
                '}' +
                '.info {' +
                  'padding-left: 50px;' +
                  'font-size: 14px;' +
                  'text-align: left;' +
                  'width: 100%;' +
                  'padding-bottom: 10px;' +
                '}' +
            '</style>' +
        '</head>' +
        '<body> ' +
            '<table>' +
                '<tbody>' +
                    '<tr>' +
                        '<th id="posting_name" colspan="1" class="head">' + posting.name + '</th>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
            '<table style="width: 100%">' +
                '<tbody>' +
                    '<tr>' +
                        '<th id="posting_info" colspan="2" class="info">' + ( posting.info ? posting.info : '' ) + '</th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Data Real:</td>' +
                        '<td id="real_date" class="value">' + formatDate( posting.realDate )+ '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Data Estimada:</td>' +
                        '<td id="estimate_date" class="value">' + formatDate( posting.estimateDate ) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Valor Real:</td>' +
                        '<td id="real_value" class="value">' + formatValue( posting.realValue )+ '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Valor Estimado:</td>' +
                        '<td id="estimate_value" class="value">' + formatValue( posting.estimateValue ) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Finaliza Automáticamente:</td>' +
                        '<td id="fl_completion_auto" class="value">' + formatBoolean( posting.completionAuto  )+ '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Situação:</td>' +
                        '<td id="state" class="value">' + formatState( posting.state ) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Categoria do Lançamento:</td>' +
                        '<td id="ref_posting_category" class="value">' + formatRef( posting.category ) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Responsável:</td>' +
                        '<td id="ref_user" class="value">' + formatRef( posting.user ) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Tipo de Finalização:</td>' +
                        '<td id="ref_completion_type" class="value">' + formatRef( posting.completionType ) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="field">Entidade:</td>' +
                        '<td id="ref_entity" class="value">' + formatRef( posting.entity ) + '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
        '</body>' +
        '</html>';
    };

    function formatDate(date) {
        if (date) {

            var d = Date.parse(date);

            d = new Date(d);

            return d.toLocaleDateString('br');
        }

        return 'n/d';
    }

    function formatValue(value) {
        if (value) {
            return 'R$ ' + value.toFixed(2);
        }

        return 'n/d';
    }

    function formatRef(value) {
        if (value) {
            return value.name;
        }

        return 'n/d';
    }

    function formatState(state) {
        switch (state) {
            case 0:
                return 'Cadastrado';
            case 1:
                return 'Em Andamento';
            case 2:
                return 'Finalizado';
            case 3:
                return 'Excluído';
        }
    }

    function formatBoolean(b) {
        return b ? 'Sim' : 'Não';
    }

    return PostingMail; 
};