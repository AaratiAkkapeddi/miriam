import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Menutrigger} from '../';
import {MobileMenu} from '../';


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
   }



   render() {

    return (

     <nav>
        <Menutrigger></Menutrigger>
        <MobileMenu></MobileMenu>
         <div className='nav-bookstore'><a href='https://miriam.shoplightspeed.com/'>Bookshop</a></div>
      </nav>




    );
  }
}

export default Navigation
