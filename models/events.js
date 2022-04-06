const mongoose = require('mongoose');

//define database schema
const eventschema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    location:{
        type : String,
        required : true
    },

    date :{
        type : String,
        required: false
    }
});

module.exports = mongoose.model('Events', eventschema);

