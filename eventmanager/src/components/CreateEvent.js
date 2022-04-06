import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'
import axios from 'axios';

//for validations not yet implemented
export default class CreateEvent extends Component {
    constructor(props){
        super(props);

        this.state = {

            name:"",
            description: "",
            location:"",
            date:new Date(),
            locations:[]
            
        }

    }

    componentDidMount(){
    
        this.retrieveLocations();
      }


     //retrive locations 
  retrieveLocations(){
    axios.get("/locations").then(res=>{
      if(res.data.success){
        this.setState({
          locations: res.data.exsistingLocations
        })
        console.log(this.state.locations);
      }
    });
  }


    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })

    }

    onSubmit = (e) =>{
        e.preventDefault();

        const {name, description, location, date} = this.state;

        const data = {
            name:name,
            description:description,
            location:location,
            date:date.toString()
        }

        console.log(data);

        axios.post("/event/save", data).then((res)=>{
            if(res.data.success){
                this.setState({
                    name:"",
                    description: "",
                    location:"",
                    date:new Date()

                })
            }
        });
        alert("Event Created Successfully!");
        window.location.replace("/");

    }
    
   
    render() { 
        return ( 
            <div className='container'>
    
                

                <div className='form-wrap'>     
                <h1>Create New Event</h1>           
                <form>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type="text" className='form-control' placeholder='Enter Event Name' name='name' value={this.state.name}
                        onChange={this.handleInputChange}/>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea placeholder='Enter Description' className='form-control' name='description' value={this.state.description}
                        onChange={this.handleInputChange}/>
                    </div>
                    
                    <div className='form-group'>
                    <label>
                        Pick your favorite location:</label>
                        
                        <select name='location' className='form-control' value={this.state.location} onChange={this.handleInputChange}>
                        {this.state.locations.map(loc => (
                        <option value={loc.name}>{loc.name}</option>
                        ))}
                        </select>
                    </div>

                    
                    
                   <div className='form-group'>
                        <label> Select The Date:</label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={(d)=>{this.setState({date:d})}}
                            name="date" className='form-control'
                            dateFormat="MM/dd/yyyy"
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 700)}/>

                   </div>  
                    <button type='submit' className='btn blue' onClick={this.onSubmit}>
                        Create New Event
                    </button>

                </form>
                </div>
            </div>
         );
    }
}
 
