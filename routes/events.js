const express = require('express');
const Events = require('../models/events');

const router = express.Router();

//create new events
router.post('/event/save', (req,res) =>{

    let newEvent = new Events(req.body);

    newEvent.save((err)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "event created successfully"
        })
    })
    
});

//get all events
router.get('/events', (req, res)=>{
    Events.find().exec((err, events)=>{
        if(err){
            return res.status(400).json({
                error: err

            })      
         }
         return res.status(200).json({
             success: true,
             existingEvents: events
         })

    });
});

//get specific events
router.get('/event/:id', (req, res)=>{
    let eventId = req.params.id;
    Events.findById(eventId,(err, event)=>{
        if(err){
            return res.status(400).json({
                success:false,
                err

            });      
         }
         return res.status(200).json({
             success: true,
             event
         })

    });
});

//update event
router.put('/event/update/:id', (req,res)=>{
    Events.findByIdAndUpdate(
        req.params.id,
        {
            $set : req.body
        },
        (err, event)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                success: "updated successfully"

            })
        })
});

//delete an event
router.delete('/event/delete/:id', (req,res)=>{
   Events.findByIdAndRemove(req.params.id).exec((err, deletedevent)=>{
       if(err){
           res.status(400).json({error: err})
       }
       return res.status(200).json({
           message: "deleted successfully", deletedevent
       })
   })

});

module.exports = router;