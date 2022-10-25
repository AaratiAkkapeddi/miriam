import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Mainmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info:null
    };
    this.blanketClose = this.blanketClose.bind(this);
    this.triggerCloseMenu = this.triggerCloseMenu.bind(this);
   }

 componentDidMount() {
  fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/info?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
    .then(res => res.json())
    .then(res => {
      this.setState({ info: res.records })
    })
    .catch(error => console.log(error))

  }
 triggerCloseMenu(){
    const menu = document.getElementById('main-menu');
    menu.classList.remove('open')
   }
  blanketClose(){
    const menu = document.getElementById('main-menu');
    menu.classList.remove('open')
  }


   render() {
    const {info} = this.state

    let logoStyle;
    let menuStyle;
    let aStyle;
    let afirstStyle;
    if(info){
      logoStyle = {
        'color': info[0].fields.LogoTextColor,
        'backgroundColor': info[0].fields.LogoBackgroundColor
      }

      menuStyle = {
        'color': info[0].fields.MenuTextColor,
        'borderColor': info[0].fields.MenuTextColor,
        'backgroundColor': info[0].fields.MenuBackgroundColor
      }
       aStyle = {
        
        'borderBottom': "1px solid " + info[0].fields.MenuTextColor
      }
      afirstStyle = {
        
        'borderTop': "1px solid " + info[0].fields.MenuTextColor,
         'borderBottom': "1px solid " + info[0].fields.MenuTextColor
      }
    }
    
    
    return (

      <div style={menuStyle} id='main-menu'>
      <div className='blanket' onClick={this.blanketClose}><span></span><span></span></div>
       <a href='/'><div style={logoStyle} className='logo text-medium'>Miriam</div></a>
         <ul className='text-small baskerville'>
            <li><a style={afirstStyle} href='/current'>Current</a></li>
            <li><a style={aStyle} href='/upcoming'>Upcoming</a></li>
            <li><a style={aStyle} href='/past'>Past</a></li>
            <li><a style={aStyle} href='/info'>Info</a></li>
            <li><a style={aStyle} href='https://miriam.shoplightspeed.com/'>Bookshop</a></li>
         </ul>
         
         {info ? 
          <div>
          <div className='menu-image'>
         {info[0].fields.MenuImage ? 
            <img src ={"https://res.cloudinary.com/drik2e1su/image/upload/v1666708867/Info/" + info[0].fields.MenuImageID.trim()}/>
            :""}
          </div>
         <div className='info-menu text-tiny row'>
         <ReactMarkdown className="col-6 col-lg-12" children={info[0].fields.LocationText} />
         <ReactMarkdown className="col-6 col-lg-12" children={info[0].fields.HoursText} />
         </div>
         </div>
         : 'poop' }
      </div>

    );
  }
}

export default Mainmenu
