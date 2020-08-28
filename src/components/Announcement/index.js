import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {Navigation} from '../';
import {Mainmenu} from '../';
import {Menutrigger} from '../';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Announcement extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
    this.formatDate = this.formatDate.bind(this);
    this.getOrdinalNum = this.getOrdinalNum.bind(this);
   }
    getOrdinalNum(number) {
      let selector;

      if (number <= 0) {
        selector = 4;
      } else if ((number > 3 && number < 21) || number % 10 > 3) {
        selector = 0;
      } else {
        selector = number % 10;
      }

      return number + ['th', 'st', 'nd', 'rd', ''][selector];
    };
   formatDate(date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + '' + ampm;
      const myArr = [];
      myArr.push((monthNames[date.getMonth()]) + "." + this.getOrdinalNum(date.getDate()) + ", " + date.getFullYear());
      myArr.push(strTime + ' EST');
      return myArr;
    }

   render() {
    const {record} = this.props
    var pageStyle = {
        backgroundColor: record.fields.PageBackgroundColor,
        borderColor: record.fields.PageLineColor,
        color: record.fields.PageTextColor
      };
      var bookButton = {
        color: record.fields.PageBackgroundColor
      }
   var logoStyle = {
        backgroundColor: record.fields.LogoBackgroundColor,
        backgroundImage: (record.fields.LogoBackgroundImage ? "url(" + record.fields.LogoBackgroundImage[0].url +")" : " "),
        color: record.fields.LogoColor
      }
    if(record.fields.PageHeroImage && record.fields.PageHeroImageBackground){
      var headerStyle = {
        "backgroundColor": record.fields.PageHeaderColor,
        "color": record.fields.PageHeaderTextColor,
        "backgroundImage": (record.fields.PageHeroImage ? 'url(' + record.fields.PageHeroImage[0].url + ')' : ''),
      }
    } else{
      var headerStyle = {
        "backgroundColor": record.fields.PageHeaderColor,
        "color": record.fields.PageHeaderTextColor
      }
    }
      if(record.fields.HeroImages){
      var slides = record.fields.HeroImages.map((x,i)=>{

                    return(
                      <div>
                      <img src={x.url}></img>
                      <div className='caption row'>
                        
                      {record.fields.HeroImageCaptions ? 
                        <div className='col-12'>
                        {record.fields.HeroImages.length == record.fields.HeroImageCaptions.split(',').length ?
                        
                        <ReactMarkdown  source={record.fields.HeroImageCaptions.split(',')[i]}/>
                       
                      :""}
                      </div>
                        :""}
                       </div>
                      </div>

                      )
                  })
      }


    const everything = record ? 
    (
       
        <div className='announcement-page event-page' key={record.id} >
          <div className='banner row'>
            <div className='header text-medium baskerville'> Announcement </div>
          </div>

            <div className='row'>
          <div className='col-12'>
            <header style={headerStyle}>
            {record.fields.HeaderImage ? 
              <img src={record.fields.HeaderImage[0].url}/>
              : 
             ""
            }
            {record.fields.PageHeaderText ? 
               <h1 className={record.fields.HeaderImage ? 'header-with-image text-large baskerville': 'text-large baskerville'}> {record.fields.PageHeaderText}</h1>
               :
               ""
            }
            {record.fields.PageHeroImage && !record.fields.PageHeroImageBackground ?
                <img className="stacked-hero-image" src={record.fields.PageHeroImage[0].url}/>
            :
            ""}

            </header>

            <div className='toolbar'>
              <div className='row'>
                 <div className='col-6'>
                 <ReactMarkdown source={record.fields.PageDateTimeText} /></div>
                 <div className='col-6'>
                 <ReactMarkdown source={record.fields.PageDetailsRight} />
                </div>
              </div>
            </div>
            <div className=' text-small baskerville'><ReactMarkdown source={record.fields.PageDescription} /></div>
          </div>          
          </div>
        </div>
       ) : 'loading'
    return (
    <div className='exhibition'>
      <Navigation></Navigation>
      <Menutrigger style={logoStyle}></Menutrigger>
          <Mainmenu></Mainmenu>
     
     <div className=''>
      
         {everything}
     </div>
     </div>





    );
  }
}

export default Announcement