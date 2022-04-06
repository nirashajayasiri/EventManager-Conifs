import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../index.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state ={

      events:[],
      

    };

  }

  componentDidMount(){
    
    this.retrieveEvents();
    
  }
  
  //create method for retrieve all events
  retrieveEvents(){
    axios.get("/events").then(res=>{
      if(res.data.success){
        this.setState({
          events: res.data.existingEvents
        })
        console.log(this.state.events);

        console.log(format(new Date(), "yyyy-MM-dd"));
      }
    })

  }

 
//delete an event
  onDelete = (id)=>{
    axios.delete(`/event/delete/${id}`).then((res)=>{
      alert("deleted successfuly");
      this.retrieveEvents();
    })
  }
  render() { 
    return (  
    <div className='container'>
      <div id='header'>
        <h1>Events</h1>
        <a href="/add" className='btn blue'>Add new Event</a>
      </div>
      
      {this.state.events.map(event => (

        <div className='event-details'>
          <div className='info-wrap'>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p className='date-wrap'><i class="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;{format(new Date(event.date),"yyyy-MM-dd")}</p>
          <p><i class="fa-solid fa-location-dot"></i>&nbsp;&nbsp;{event.location}</p>
          </div>
          <div className='btn-wrap'>
            <a href={`/edit/${event._id}`} className='btn orange'>Update</a>
            <button className='btn purple' onClick={()=>this.onDelete(event._id)}>Delete</button>
          </div>
        </div>
      ))}

    </div>
    );
  }
}