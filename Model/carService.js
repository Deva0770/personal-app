const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 // List of columns for Employee schema
 let CarService = new Schema({
    carno : {type:String},
    name : {type:String},
    contactno : {type:String},
    servicedetails : {type:String},
    price : {type:Number},
    status : {type:String},
    indate : {type:String},
    outdate :{type:String}
 },{
 collection: 'carservice'
 });
 
 module.exports = mongoose.model('carservice', CarService);