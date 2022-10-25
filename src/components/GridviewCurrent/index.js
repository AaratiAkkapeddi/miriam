import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import slugify from "react-slugify"

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class GridviewCurrent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovers: {},
    };
        this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
     this.formatDate = this.formatDate.bind(this);
    this.getOrdinalNum = this.getOrdinalNum.bind(this);
    this.invertColor = this.invertColor.bind(this);

   }
   hoverOn(id, hoverstate){
  hoverstate[id] = true;
  this.setState({hovers: hoverstate})
 }
 hoverOff(id, hoverstate){
  hoverstate[id] = false;
  this.setState({hovers: hoverstate})
 }
  invertColor(event){
    var b = event.target.style.backgroundColor;
    var c = event.target.style.color;

    event.target.style.color = b;
    event.target.style.backgroundColor = c;

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
    let upcoming = [];
    let past = [];
    let current = [];
    let urlswitch = false;
    let allTags = []; 
    const{hovers} = this.state
    const {records, tense} = this.props
    const everythings = records.length > 0 ? records.map((x)=>{
      let pageHeroImages = x.fields.PageHeroImageIDs.split("|");
      for(let i = 0; i < pageHeroImages.length; i++){
        let url = x.type == 'event' ? "https://res.cloudinary.com/drik2e1su/image/upload/v1666708638/Events/" : "https://res.cloudinary.com/drik2e1su/image/upload/v1666706439/Exhibitions/"
        if(x.type == 'announcements'){
          url = "https://res.cloudinary.com/drik2e1su/image/upload/v1666709931/Announcements/"
        }
        pageHeroImages[i] =  url + pageHeroImages[i].trim()
      }
      const divStyle={
        backgroundImage: (!pageHeroImages ? '' : "url(" + pageHeroImages[0] + ")"),
        backgroundSize: "cover",
        backgroundPosition: "center"
      }
      if(x.fields.Tags){
        for (var i = x.fields.Tags.split(" ").length - 1; i >= 0; i--) {
          if(!allTags.includes(x.fields.Tags.split(" ")[i])){
            allTags.push(x.fields.Tags.split(" ")[i])
          }
        }
      }

          let dateClass = ''
      if(x.fields.StartDate){
        var d1 = new Date();
        var d2 = new Date(x.fields.StartDate);

        if(d2 > d1){
          dateClass = "upcoming"
          upcoming.push(x)
        }else{
          dateClass = "past"

          if(x.fields.EndDate){
            var d3 = new Date(x.fields.EndDate);
            if(d3 > d1){
              dateClass = "current"
              current.push(x)
            }else{
              past.push(x)
            }
          }
        }

      }
      var thumbStyle={
        "color":x.fields.ThumbnailColor,
        "backgroundColor":x.fields.ThumbnailBgColor
      }
      var hoverStyle = {
         "backgroundColor":x.fields.ThumbnailColor,
        "color":x.fields.ThumbnailBgColor
      }
if(dateClass == tense){
   var linkroot = ''
      if(x.type == 'exhibition'){
         linkroot = '/exhibition/'
      }else if(x.type == 'event'){
        linkroot = '/event/'
      }else {
        linkroot = '/announcement/'
      }
      return(
            <a onMouseOver={()=> this.hoverOn(x.id,hovers)} onMouseLeave={()=> this.hoverOff(x.id,hovers)}  style={hovers[x.id] ? hoverStyle : thumbStyle} href={linkroot+slugify(x.fields.Title)} key={x.id} id={x.id} className={dateClass == tense ? x.fields.Tags + " "+ dateClass + " grid-item on " :  x.fields.Tags + " "+ dateClass + " grid-item "} >
              <h1 className='text-large title mobile-title baskerville'>{x.fields.Title}</h1>
              <div className='grid-image' style={divStyle}></div>
              <div className='grid-text'>
                <h1 className='text-large title desktop-title baskerville'>{x.fields.Title}</h1>
                <h1 className='text-small baskerville'>{x.fields.PageDateTimeText}</h1>
              </div>
            </a>
       )
    }
      }) : 'loading'
    //  if(tense == 'upcoming' && upcoming.length == 1){
    //    var linkroot = ''
    //   if(upcoming[0].type == 'exhibition'){
    //      linkroot = '/exhibition/'
    //   }else if(upcoming[0].type == 'event'){
    //     linkroot = '/event/'
    //   }else{
    //     linkroot = '/announcement/'
    //   }
    //   window.location.href=linkroot+upcoming[0].id
    // }
    // if(tense == 'current' && current.length == 1){
    //    var linkroot = ''
    //   if(current[0].type == 'exhibition'){
    //      linkroot = '/exhibition/'
    //   }else if(current[0].type == 'event'){
    //     linkroot = '/event/'
    //   }else {
    //     linkroot = '/announcement/'
    //   }
    //   window.location.href=linkroot+current[0].id
    // }
    return (

     <div className='grid-view '>
     {current.length < 1 ?
              <div>more coming soon...</div>
              :""}
         {everythings}
     </div>





    );
  }
}

export default GridviewCurrent
