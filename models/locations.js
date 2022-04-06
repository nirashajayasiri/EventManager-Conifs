const mongoose = require('mongoose');

//define database schema
const locationschema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    }
    
});

module.exports = mongoose.model('Locations', locationschema);