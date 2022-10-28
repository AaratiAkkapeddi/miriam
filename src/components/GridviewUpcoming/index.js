import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import slugify from "react-slugify"
import waveBear from "./paint-bear-waving.gif"
// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class GridviewUpcoming extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovers:{},
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
    const {hovers} = this.state
    const {records, tense} = this.props
    const everythings = records.length > 0 ? records.map((x)=>{
      let pageHeroImages = x.fields.PageHeroImageIDs?.split("|");
      for(let i = 0; i < pageHeroImages?.length; i++){
        let url = x.type == 'event' ? "https://res.cloudinary.com/drik2e1su/image/upload/v1666708638/Events/" : "https://res.cloudinary.com/drik2e1su/image/upload/v1666706439/Exhibitions/"
        if(x.type == 'announcements'){
          url = "https://res.cloudinary.com/drik2e1su/image/upload/v1666709931/Announcements/"
        }
        pageHeroImages[i] =  url + pageHeroImages[i].trim()
      }
      var mybg = !x.fields.ThumbnailImage ? '' : "url(" + x.fields.ThumbnailImage[0].url + ")";
      if(mybg == ''){
          mybg = !pageHeroImages ? '' : "url(" + pageHeroImages[0] + ")";
      }

      const divStyle={
        backgroundImage: mybg,
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
      const hoverStyle= {
        "backgroundColor":x.fields.ThumbnailColor,
        "color":x.fields.ThumbnailBgColor
      }
      var linkroot = ''
      if(x.type == 'exhibition'){
         linkroot = '/exhibition/'
      }else if(x.type == 'event'){
        linkroot = '/event/'
      }else {
        linkroot = '/announcement/'
      }
    if(dateClass == "upcoming"){
      return(
        <a onMouseOver={()=> this.hoverOn(x.id,hovers)} onMouseLeave={()=> this.hoverOff(x.id,hovers)} href={linkroot+slugify(x.fields.Title)} key={x.id} id={x.id} className={dateClass == tense ? x.fields.Tags + " "+ dateClass + " grid-item on col-12 col-sm-6" :  x.fields.Tags + " "+ dateClass + " grid-item col-12 col-sm-6"} >
         <div style={hovers[x.id] ? hoverStyle : thumbStyle}>
          <h1 className='text-medium title baskerville'>{x.fields.ThumbnailHed}</h1>
          <div className='grid-image' style={divStyle}></div>
           <h1 className='text-small baskerville'>{x.fields.ThumbnailSubHed}</h1>
         </div>
        </a>
       )}
      }) : 'loading'
    //  if(tense == 'upcoming' && upcoming.length == 1){
    //    var linkroot = ''
    //   if(upcoming[0].type == 'exhibition'){
    //      linkroot = '/exhibition/'
    //   }else if(upcoming[0].type == 'event'){
    //     linkroot = '/event/'
    //   }else {
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
    //   }else if(current[0].type == 'announcement'){
    //     linkroot = '/announcement/'
    //   }
    //   window.location.href=linkroot+current[0].id
    // }
    return (

     <div className='grid-view upcoming row'>
     {upcoming.length < 1 ?
         <>
              <div className="col-12">more coming soon...</div>
              <div className=" col-12"><img className="wave-bear" src={waveBear} /></div>
              <div className="col-12">explore other offerings...</div>
                 </>
              :""}
              
         {everythings}

     </div>





    );
  }
}

export default GridviewUpcoming
