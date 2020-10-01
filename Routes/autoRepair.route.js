// Importing important packages
const express = require('express');
 
// Using express and routes
const app = express();
const autorepairRoute = express.Router();

// autorepair module which is required and imported
let autorepairModel = require('../Model/carService');
let serviceTypeModel = require('../Model/serviceType');

// To Get List Of car.  GET Function.
autorepairRoute.route('/').get(function (req, res) {
    autorepairModel.find(function (err, car) {
        if (err) {
            console.log(err);
        }
        else {
        res.json(car);
        }
    });
});

// To GET List Of servicetype
autorepairRoute.route('/servicetype').get(function (req, res) {
    serviceTypeModel.find(function (err, car) {
        if (err) {
            console.log(err);
        }
        else {
        res.json(car);
        }
    });
});

// To Add New car for service, POST Function.
autorepairRoute.route('/carservice').post(function (req, res) {
    let autorepair = new autorepairModel(req.body);
    autorepair.save()
    .then(game => {
    res.status(200).json({ 'autorepair': 'Car Details Added Successfully' });
    })
    .catch(err => {
    res.status(400).send("Something Went Wrong"+err);
    });
});

// To GET car Details By autorepair ID.  For Editing the already entered details to reappear.
autorepairRoute.route('/editcar/:id').get(function (req, res) {
    let id = req.params.id;
    autorepairModel.findById(id, function (err, car) {
    res.json(car);
    });
});

// To Update The care Details.  To change and update car details while editing.
autorepairRoute.route('/updatecar/:id').put(function (req, res) {
    autorepairModel.findById(req.params.id, function (err, car) {
        if (!car)
             return next(new Error('Unable To Find car With This Id'));
        else {
            var date_val = new Date().toLocaleDateString();
            var updateRecord =  {
                carno : req.body.carno,
                name : req.body.name,
                contactno : req.body.contactno,
                servicedetails : req.body.servicedetails,
                price : req.body.price,
                status : req.body.status,
                indate : req.body.indate,
                outdate : date_val
            };

            autorepairModel.findByIdAndUpdate(req.params.id,{$set:updateRecord}, (err,docs)=>{
                if(!err)
                    res.send(docs); //res.json('Car details Updated Successfully');
                else
                    console.log('Error while updating all records :'+JSON.stringify(err,undefined,2));
                })
                .catch(err => {
                    res.status(400).send("Unable To Update Car");
                });
        }
    });
});

// To Delete The Car
autorepairRoute.route('/deletecar/:id').delete(function (req, res) {
    autorepairModel.findByIdAndRemove({ _id: req.params.id }, function (err, car) {
         if (err) res.json(err);
         else res.json('Car Deleted Successfully');
    });
});

module.exports = autorepairRoute;