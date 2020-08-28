import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
   }



   render() {

    return (

     <footer>
     <div className='row'>
        <div className='col-3'>
          <h1 className='text-small'>Miriam</h1>
          <p className='text-tiny baskerville'>gallery + bookshop<br/>@miriam.gallery</p>
        </div>
        <div className='col-3'>
          <p className='text-tiny baskerville'>319 Bedford Ave,<br/>Williamsburg<br/>Brooklyn, NY 11211</p>
        </div>
        <div className='col-3'>
            <p className='text-tiny baskerville'>
            Mon-Fri: By Appointment<br/>Sat-Sun: 8PM<br/>Always Social Distancing
            </p>
        </div>
        <div className='col-3'>
            <p className='text-tiny baskerville'>info@miriamgallery.com</p>
        </div>
        </div>
      </footer>




    );
  }
}

export default Footer