/* global module */

var mongoose = require( 'mongoose' );

var uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
    var schema = mongoose.Schema
    ( {
        name :      { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        login:      { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        password:   { type: String, required: [true, 'não pode estar vazio'] },
        state:      { type: Number, required: [true, 'não pode estar vazio'], default: 0 },
        email:      { type: String, required: [true, 'não pode estar vazio'], index:{ unique : true } },
        role:       { type: String, required: [true, 'não pode estar vazio'], enum: [ 'Administrador', 'Operador' ] },
        phone:      { type: String, minlength: [10, 'não está válido' ], maxlength: [11, 'não está válido' ] },
        annotation: { type: String },
        picture:    { type: String },
        createAt:   { type: Date,   default: Date.now }
    } );

    schema.plugin( uniqueValidator, { message: " está adicionado em outro usuário." } );

    return mongoose.model( 'User', schema );
};
