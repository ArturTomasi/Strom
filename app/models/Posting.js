/* global module */

var mongoose = require( 'mongoose' );

var uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
    var STATE_REGISTRED = 0;
    var STATE_PROGRESS  = 1;
    var STATE_FINISHED  = 2;
    var STATE_DELETED   = 3;

    var schemaAttachment = 
    {
        name: { type: String, required: [ true, 'não pode estar vazio'] },
        info: { type: String  },
        url:  { type: String, required: [ true, 'não pode estar vazio'] }
    };

    var schema = mongoose.Schema
    ( {
        name:               { type: String, required: [ true, 'não pode estar vazio'] },
        info:               { type: String  },
        realDate:           { type: Date    },
        estimateDate:       { type: Date,   required: [ true, 'não pode estar vazio'] },
        realValue:          { type: Number  },
        estimateValue:      { type: Number, required: [ true, 'não pode estar vazio'] },
        portion:            { type: Number, required: [ true, 'não pode estar vazio'], default: 1 },
        portionTotal:       { type: Number, required: [ true, 'não pode estar vazio'], default: 1 },
        repet:              { type: Boolean,required: [ true, 'não pode estar vazio'], default: false },
        completionAuto:     { type: Boolean,required: [ true, 'não pode estar vazio'], default: false },
        state:              { type: Number, required: [ true, 'não pode estar vazio'], default: 0 },
        category:           { type: mongoose.Schema.Types.ObjectId, ref: 'Categories',  required: [ true, 'não pode estar vazio'] },
        user:               { type: mongoose.Schema.Types.ObjectId, ref: 'Users',       required: [ true, 'não pode estar vazio'] },
        completionType:     { type: mongoose.Schema.Types.ObjectId, ref: 'CompletionTypes' },
        entity:             { type: mongoose.Schema.Types.ObjectId, ref: 'Entities',    required: [ true, 'não pode estar vazio'] },
        posting:            { type: mongoose.Schema.Types.ObjectId, ref: 'Postigns' },
        attachments:        [ schemaAttachment ],
        createAt:           { type: Date,   default: Date.now }
    } );
    
    schema.plugin( uniqueValidator, { message: " está adicionado em outro lançamento." } );
    
    return mongoose.model( 'Postings', schema );
};


