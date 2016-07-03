/* global module */

var mongoose = require( 'mongoose' );

var uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
    var schema = mongoose.Schema
    ( {
        name :    { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        login:    { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        password: { type: String, required: [true, 'não pode estar vazio'] },
        state:    { type: Number, required: [true, 'não pode estar vazio'], default: 0 },
        email:    { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        phone:    { type: String }
    } );
    
    schema.plugin( uniqueValidator, { message: " está adicionado em outro usuário." } );
    
    return mongoose.model( 'User', schema );
};