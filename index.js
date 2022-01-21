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
const uri = "mongodb+srv://PublicUser:publicpassword@tyrowo.qramt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);
//connects to mongodb that I set up.

const Lulz = require('./lulzModel');

//~~~~~~~~~~~~~~~~~~~~
// API Routes 
//~~~~~~~~~~~~~~~~~~~~
const router = express.Router(); //creates instance of express router

//middleware for all requests
router.use((req, res, next) => {
    //log that something is happening
    console.log('the route has been contacted. something is happening.');
    next(); //goes to next routes
})

//test route to make sure it's working
router.get('/', (req, res) => {
    res.json({ message: 'Nice! The API is working!' })
});

//all routes are prefixed with /api
app.use('/api', router);

//total routes to create: 5
// /api/lulz get & post -- gets all lulz and creates lulz
// /api/lulz/:id get & put & delete -- gets single lulz, updates a lulz w/ new info, delete a lulz
router.route('/lulz')
    //first route will create a new lulz at http://localhost:8069/api/lulz
    .post((req, res) => {
        console.log('making post');
        let lulz = new Lulz(); //create instance of lulz from model
        lulz.name = req.body.name; //set lulz name to inputted name in api request
        lulz.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Made new lulz!' });
            }
        });
    })
    //get all lulz function
    .get((req, res) => {
        Lulz.find((err, lulz) => {
            if (err) res.send(err);
            else res.json(lulz);
        });
    });

//id routes for get post and delete routes
router.route('/lulz/:lulz_id')
    .get((req, res) => {
        Lulz.findById(req.params.lulz_id, (err, lulz) => {
            if (err) res.send(err);
            res.json(lulz);
        });
    })

    .put((req, res) => {
        Lulz.findById(req.params.lulz_id, (err, lulz) => {
            if (err) res.send(err);
            lulz.name = req.body.name; //changes cur lulz name to new name

            lulz.save((err) => {
                if (err) res.send(err);
                res.json({ message: `Lulz ${lulz.name} updated!` });
            });
        });
    })

    .deleteOne((req, res) => {
        Lulz.remove({
            _id: req.params.lulz_id
        }, (err, lulz) => {
            if (err) res.send(err);
            res.json({ message: `Successfully deleted lulz.` });
        });
    });

//~~~~~~~~~~~~~~~~~~~~
// starting the server
//~~~~~~~~~~~~~~~~~~~~
app.listen(port);
console.log(`we're working on port ${port}.`);
