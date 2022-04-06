import axios from 'axios';
import React, { Component } from 'react';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays';
//import {format} from 'date-fns';

export default class EditEvent extends Component {
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
        const id = this.props.match.params.id;

        const {name, description, location} = this.state;

        const data = {
            name:name,
            description:description,
            location:location
        }

        console.log(data);

        axios.put(`/event/update/${id}`, data).then((res)=>{
            if(res.data.success){
                alert("event updated successfully");                
                this.setState({
                    name:"",
                    description: "",
                    location:""
                    

                });
                window.location.replace("/");
            }
        })

    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/event/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    name:res.data.event.name,
                    description:res.data.event.description,
                    location:res.data.event.location
                    
                })
                console.log(this.state.event);
            }
        })
        this.retrieveLocations();
    }
    render() { 
        return ( 
            <div className='container'>                
                <div class="form-wrap">

                <h1>Update Event</h1>

                <form>
                    <div className='form-group'>
                        <label>Event name</label>
                        <input type="text" placeholder='Enter Event Name' className='form-control' name='name' value={this.state.name}
                        onChange={this.handleInputChange}/>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea placeholder='Enter Description' className='form-control' name='description' value={this.state.description}
                        onChange={this.handleInputChange}/>
                    </div>
                    <div className='form-group'>
                        <label>
                            Pick your location:</label>
                            
                            <select name='location' className='form-control' value={this.state.location} onChange={this.handleInputChange}>
                            {this.state.locations.map(loc => (
                            <option value={loc.name}>{loc.name}</option>
                            ))}
                            </select>                        
                        </div>
                   {/* <div>
                        <label> Select The Date:
                        <DatePicker
                            selected={format(new Date(this.state.date),"yyyy-MM-dd")}
                            onChange={(d)=>{this.setState({date:d})}}
                            name="date"
                            dateFormat="MM/dd/yyyy"
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 700)}/>
                        </label>
                   </div> */}
                    <button type='submit' className='btn blue' onClick={this.onSubmit}>
                        Edit Event Details
                    </button>

                </form>
                </div>
            </div>
         );
    }
}
 
