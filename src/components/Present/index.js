import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Navigation, Footer} from '../';
import {Mainmenu} from '../';
import {Listview} from '../';
import {GridviewCurrent} from '../';

class Past extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listview:false
    };
    this.showList = this.showList.bind(this);
    this.showGrid = this.showGrid.bind(this);
   }
   showList(){
    this.setState({ listview: true });
   }
   showGrid(){
    this.setState({ listview: false });
   }

   render() {
    const {records} = this.props
    var published = []
    for (var i = records.length - 1; i >= 0; i--) {
      if(records[i].fields.PagePublished){
        published.push(records[i])
      }
    }
    console.log(published)
    published = published.sort(function (a, b) {
  if (a.fields.StartDate > b.fields.StartDate) return -1;
  if (a.fields.StartDate < b.fields.StartDate) return 1;
  return 0;
});
    console.log(published)
    const {listview} = this.state
    return (

     <header className={listview ? "App-header pastpage upcoming-page list-header" : "App-header upcoming-page pastpage" }>
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <div className='header text-large '> Current </div>
          
          <div className='main-area'>
            <div className='view-space'>
      
            {!listview ? <GridviewCurrent tense="current" records={published}></GridviewCurrent> :
              <Listview tense="current" records={published}></Listview>
            }
            </div>
          </div>
          <hr></hr>
          <div className='archive-links'>
          <a href='/upcoming'><h1 className='baskerville text-large'>Upcoming,</h1></a><a href='/past'><h1 className='baskerville text-large'>Past</h1></a>
          </div>
          <Footer></Footer>
      </header>




    );
  }
}

export default Past
