import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
import slugify from "react-slugify"

import {Exhibition,Footer, Event} from '../';

class Happening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myrecord:null
    };
   }
  findRecord(){
      var mew = ' ';

      for (var i = this.props.records.length - 1; i >= 0; i--) {
        if(slugify(this.props.records[i].fields.Title) == this.props.match.params.id){
          document.getElementsByTagName('body')[0].style.backgroundColor = this.props.records[i].fields.PageBackgroundColor


            mew = (
            <Event record={this.props.records[i]}></Event>
          )
         
         
        }
      }
      return(
        mew
        )
   }
   render() {

    this.findRecord();
    const {records} = this.props
    const {record} = this.state
    return (

     <header className="App-header happening">
   
         {this.findRecord()}
         
      </header>




    );
  }
}

export default withRouter(Happening)
