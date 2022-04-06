const express = require('express');
const Locations = require('../models/locations');

const router = express.Router();


//create new locations
router.post('/location/save', (req,res) =>{

    let newLocation = new Locations(req.body);

    newLocation.save((err)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "location added successfully"
        })
    })
    
});
//get all locations
router.get('/locations', (req, res)=>{
    Locations.find().exec((err, locations)=>{
        if(err){
            return res.status(400).json({
                error: err

            })      
         }
         return res.status(200).json({
             success: true,
             exsistingLocations: locations
         })

    });
});

module.exports = router;