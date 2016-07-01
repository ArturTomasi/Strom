/* global module */

var mongoose = require( 'mongoose' );

module.exports = function ()
{
    var schema = mongoose.Schema
    ( {
        name :    { type: String, required: true, index:{ unique : true } },
        login:    { type: String, required: true, index:{ unique : true } },
        password: { type: String, required: true },
        state:    { type: Number, required: true, default: 0 },
        email:    { type: String, required: true, index:{ unique : true } },
        phone:    { type: String }
    } );
    
    return mongoose.model( 'User', schema );
};