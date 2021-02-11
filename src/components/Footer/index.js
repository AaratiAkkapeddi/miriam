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

     <footer style={this.props.style}>
     <div className='row'>
        <div className='col-6 col-sm-3'>
          <h1 className='text-small'>Miriam</h1>
          <p className='text-tiny baskerville'>gallery + bookshop<br/><a style={{textDecoration:"none", border:"none"}} href="https://www.instagram.com/miriam.gallery/">@miriam.gallery</a></p>
        </div>
        <div className='col-6 col-sm-3'>
          <p className='text-tiny baskerville'>319 Bedford Ave,<br/>Williamsburg<br/>Brooklyn, NY 11211</p>
        </div>
        <div className='col-6 col-sm-3'>
            <p className='text-tiny baskerville'>
            Thurs-Sun: 1-7pm<br/>(Limited capacity walk-in + <a href="https://calendly.com/miriamgallery/winterhours?month=2021-02">by appointment</a>)
            </p>
        </div>
        <div className='col-6 col-sm-3'>
            <p className='text-tiny baskerville'><a target="_blank" href='https://mailchi.mp/0a822e78bfa8/miriammailinglist'>Join Our Mailing List</a><br/>hello@miriamgallery.com</p>
        </div>
        </div>
      </footer>




    );
  }
}

export default Footer
