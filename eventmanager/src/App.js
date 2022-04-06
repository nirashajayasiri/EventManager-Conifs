import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import Home from './components/Home';



export default class App extends Component {
  
  render() { 
    return ( 
      <Router>


        <Route path="/" exact component={Home}></Route>
        <Route path="/add" component={CreateEvent}></Route>
        <Route path="/edit/:id" component={EditEvent}></Route>

      
      
      </Router>

    );
  }
}
 

 
