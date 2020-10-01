// Imported required packages
const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

// MongoDB Databse url
var mongoDatabase = 'mongodb://localhost:27017/autorepair';

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
() => { console.log('Database is connected') },
err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes
const autoRepairRoutes = require('./Routes/autoRepair.route');

// Convert incoming data to JSON format
app.use(bodyParser.json());

// Enable CORS for inbound request from frontend.
app.use(cors());

// Setup for the server port number for API
const port = process.env.PORT || 4000;

// Routes Configuration
app.use('/autoRepair', autoRepairRoutes);

//var date_val = new Date().toLocaleDateString();
//console.log(date_val);

// Staring our express server
const server = app.listen(port, function () {
console.log('Server Lisening On Port : ' + port);
});