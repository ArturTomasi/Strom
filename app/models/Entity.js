/* global module */

var mongoose = require( 'mongoose' );

var uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
    var schema = mongoose.Schema
    ( {
        name :    { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        companny: { type: String },
        cnpj:     { type: String, required: [true, 'não pode estar vazio'], minlength: [14, 'não está válido' ], maxlength: [14, 'não está válido' ] },
        state:    { type: Number, required: [true, 'não pode estar vazio'], default: 0 },
        email:    { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        phone:    { type: String, required: [true, 'não pode estar vazio'], minlength: [10, 'não está válido' ], maxlength: [11, 'não está válido' ] },
        createAt: { type: Date,   default: Date.now }  
    } );
    
    schema.plugin( uniqueValidator, { message: " está adicionado em outro entidade." } );
    
    return mongoose.model( 'Entity', schema );
};