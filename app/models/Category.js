/* global module */

var mongoose = require( 'mongoose' );

var uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
    var schema = mongoose.Schema
    ( {
        name : { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        info:  { type: String },
        state: { type: Number, required: [true, 'não pode estar vazio'], default: 0 },
        type : { type: String, required: [true, 'não pode estar vazio'], enum: [ 'Receita', 'Despesas' ] }
    } );
    
    schema.plugin( uniqueValidator, { message: " está adicionado em outro usuário." } );
    
    return mongoose.model( 'Category', schema );
};