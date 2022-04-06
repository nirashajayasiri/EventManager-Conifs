const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/events');
const locationRoutes = require('./routes/locations');
const cors = require('cors');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });

//middleware
app.use(bodyParser.json());

app.use(eventRoutes);
app.use(locationRoutes);
app.use(cors());

const port = 8000;
const DB_URL = "mongodb+srv://nir:nir123@eventmapp.njj0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//run the server
app.listen(port, ()=> console.log(`server is running on ${port}`));

//create database connection
mongoose.connect(DB_URL)
.then(()=> console.log("connected to the database"))
.catch((err)=> console.error(err));