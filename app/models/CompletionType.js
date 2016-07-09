/* global module */

var mongoose = require( 'mongoose' );

var uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
    var schema = mongoose.Schema
    ( {
        name :    { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        type :    { type: String, required: [true, 'não pode estar vazio'], enum: [ 'Cartão', 'Dinhero', 'Conta', 'Boleto', 'Serviço' ] },
        info:     { type: String },
        state:    { type: Number, required: [true, 'não pode estar vazio'], default: 0 },
        createAt: { type: Date, default: Date.now }
    } );
    
    schema.plugin( uniqueValidator, { message: " está adicionado em outro tipo de finalização." } );
    
    return mongoose.model( 'CompletionType', schema );
};