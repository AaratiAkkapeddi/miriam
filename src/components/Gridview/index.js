 import React, { Component } from 'react';
import './style.css';
import Grid from "./"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import slugify from "react-slugify"

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Gridview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovers:{}
    };
     this.formatDate = this.formatDate.bind(this);
    this.getOrdinalNum = this.getOrdinalNum.bind(this);
      this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);

   }
  
  hoverOn(id, hoverstate){
  hoverstate[id] = true;
  this.setState({hovers: hoverstate})
 }
 hoverOff(id, hoverstate){
  hoverstate[id] = false;
  this.setState({hovers: hoverstate})
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
      myArr.push((monthNames[date.getMonth()]) + " " + this.getOrdinalNum(date.getDate()) );
      myArr.push(strTime);
      return myArr;
    }


   render() {
    const {hovers} = this.state
    let upcoming = [];
    let past = [];
    let current = [];
    let urlswitch = false;
    let allTags = []; 
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
      var listStyle = {
        background: x.fields.ThumbnailBgColor,
        color: x.fields.ThumbnailColor
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
          upcoming.push(x.id)
        }else{
          dateClass = "past"

          if(x.fields.EndDate){
            var d3 = new Date(x.fields.EndDate);
            if(d3 > d1){
              dateClass = "current"
              current.push(x.id)
            }else{
              past.push(x.id)
            }
          }
        }

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
      //{title,PageDateTimeText, divStyle, id, dateClass, linkroot, tags, tense }
        return(
        <a style={hovers[x.id] ? listStyle : {}} onMouseOver={()=> this.hoverOn(x.id,hovers)} onMouseLeave={()=> this.hoverOff(x.id,hovers)}  href={linkroot+slugify(x.fields.Title)} key={x.id} id={x.id} className={dateClass == tense ? x.fields.Tags + " "+ dateClass + " grid-item on col-special" :  x.fields.Tags + " "+ dateClass + " grid-item col-special"} >
          <div className='grid-image' style={divStyle}></div>
          <h1 className='text-tiny title'>{x.fields.Title}</h1>
          <h1 className='text-tiny baskerville'>{x.fields.PageDateTimeText}</h1>
        </a>
       )
      }
      }) : 'loading'
 
    return (

     <div className='grid-view row'>
        {past.length < 1 ?
              <div>more coming soon...</div>
              :""}
         {everythings}
     </div>





    );
  }
}

export default Gridview
