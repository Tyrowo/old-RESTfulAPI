//~~~~~~~~~~~~~~~~~~~
// Base Setup
// ~~~~~~~~~~~~~~~~~~
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//configuratinos to make app use bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

var port = process.env.PORT || 8069; //setting a port number

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://PublicUser:publicpassword@tyrowo.qramt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
//connects to mongodb that I set up. hopefully.

const Lulz = require('./lulzModel')

//~~~~~~~~~~~~~~~~~~~~
// API Routes 
//~~~~~~~~~~~~~~~~~~~~
const router = express.Router(); //creates instance of express router

router.get('/', (req, res) => {
    res.json({ message: 'Nice! The API is working!' })
});

//more routes later

//route registration ??
//all routes prefixed with /api
app.use('/api', router);

//~~~~~~~~~~~~~~~~~~~~
// starting the server
//~~~~~~~~~~~~~~~~~~~~
app.listen(port);
console.log(`we're working on port ${port}.`);
