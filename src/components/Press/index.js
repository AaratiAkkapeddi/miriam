import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {Navigation, Footer} from '../';
import AliceCarousel from 'react-alice-carousel';
import {Mainmenu} from '../';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

class Press extends Component {
  constructor(props) {
    super(props);
    this.state = {
      press: null
    };

   }
   componentDidMount() {
    fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/press?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
      .then(res => res.json())
      .then(res => {
        this.setState({ press: res.records })
      })
      .catch(error => console.log(error))

    }

   render() {
    const {press} = this.state
    console.log(press)
    let pressLinks;
    if(press){
         pressLinks = press.map((x,i)=>{
            return(
                <a href={x.fields.url}><ReactMarkdown className="underline" children={x.fields.text} /></a>
            )
        })
    }
    //   var slides = info[0].fields.PageImageIDs.split("|").map((x,i)=>{


    return (

     <header className="App-header info-page">
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <div className='header text-large'> Press </div>


          <div className='main-area container-fluid'>
            <br></br>
            <div className='row'>
               <div className='col-12 text-small baskerville col-sm-12'>{pressLinks}</div> 
              {/* <ReactMarkdown className="description-text text-large baskerville col-12 col-lg-12" children={info[0].fields.PageDescription} /> */}
            </div>
           </div>

          
          <Footer></Footer>
      </header>




    );
  }
}

export default Press
