const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 // List of columns for Employee schema
 let ServiceType = new Schema({
    servicetype : {type:String},
    keyname : {type:String},    
    price : {type:Number}
 },{
 collection: 'servicetype'
 });
 
 module.exports = mongoose.model('servicetype', ServiceType);