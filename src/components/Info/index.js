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

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    };

   }
   componentDidMount() {
    fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/info', { headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_PAT })})
      .then(res => res.json())
      .then(res => {
        this.setState({ info: res.records })
      })
      .catch(error => console.log(error))

    }

   render() {
    const {info} = this.state

    if(info && info[0].fields.PageImages){
      var slides = info[0].fields.PageImageIDs.split("|").map((x,i)=>{

                    return(
                      <div className={info[0].fields.PageImageStyle}>
                      <img onClick={this.openLightbox} src={"https://res.cloudinary.com/drik2e1su/image/upload/v1666708867/Info/"+x.trim()}></img>
                      <div className='caption row'>
                        <span className='counter col-2'>{(i+1)+"/"+ info[0].fields.PageImages.length}</span>
                      {info[0].fields.PageHeroImageCaptions ? 
                        <div className='col-8'>
                        {info[0].fields.PageImages.length == info[0].fields.PageHeroImageCaptions.split(',').length ?
                        
                        <ReactMarkdown  children={info[0].fields.PageHeroImageCaptions.split(',')[i]}/>
                       
                      :""}
                      </div>
                        :""}
                       </div>
                      </div>

                      )
                  })
      }
    return (

     <header className="App-header info-page">
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <div className='header text-large'> Info </div>
        {info ? 

          <div className='main-area container-fluid'>
            <div className='row'>
              <ReactMarkdown className="description-text text-large baskerville col-12 col-lg-12" children={info[0].fields.PageDescription} />
            </div>
            {info[0].fields.PageImages ?
              <div className='top'>
              {info[0].fields.PageImages.length > 1 ?

                <div className='alice-wrapper'>
              
                <AliceCarousel ref={(el) => (this.Carousel = el)} duration='0' autoPlay autoPlayInterval="3000"
                >

                  {slides}
                </AliceCarousel>
                <button className="alice-button alice-button-prev" onClick={() => this.Carousel.slidePrev()}>Prev button</button>
                <button className="alice-button alice-button-next" onClick={() => this.Carousel.slideNext()}>Next button</button>
     
                </div>
                :
                <div className={info[0].fields.PageImageStyle}>
                <img onClick={this.openLightbox} src={info[0].fields.PageImages[0].url}></img>
                <div className='toolbar'>
                 <div className='row'>
                  <div className='col-2'></div>
                  <div className='col-8'>{info[0].fields.PageHeroImageCaptions}</div>
                 
                  </div>
                </div>
                </div>
              }
              </div>

          : ""}

            <h1 id="visit" className='baskerville text-large header-info'>Visit Us</h1>
            <div className='row'>
              <div className='col-12 col-sm-6'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2315119490318!2d-73.96423644899842!3d40.71291974539476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2596f2986070f%3A0xc1898dd9f1488a07!2sMiriam%20Gallery!5e0!3m2!1sen!2sus!4v1600956840660!5m2!1sen!2sus" width="600" height="450" frameborder="0"  allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></div>
              <ReactMarkdown className="col-12 col-sm-6 visit-us" children={info[0].fields.PageVisitText} />
            </div>
            <h1 className='baskerville text-large header-info'>Contact</h1>
            <div className='row'>
             <ReactMarkdown className="col-12 contact-text baskerville col-sm-12" children={info[0].fields.PagePersonnel} />
            </div>
            <div className='row'>
              <p className="col-12 contact-text col-sm-12 baskerville">All inquiries can be addressed to:<br></br>
             <a href="mailto:hello@miriamgallery.com">hello@miriamgallery.com</a></p>
            </div>

            <h1 className=' mailing header-info'><a href='/press'>Selected Press</a></h1>

            
            <div id='collaborators' className='row'><h1 className='col-12 collaborator-header baskerville text-large header-info'>Collaborators</h1>
              <ReactMarkdown className="col-12 text-large baskerville col-sm-12" children={info[0].fields.PageCollaborators} />
            </div>
            <h1 className='col-12 mailing header-info'>
            <a target="_blank" href='https://mailchi.mp/0a822e78bfa8/miriammailinglist' className="text-large">Join Our Mailing List</a></h1>
          </div>
         
        :""}
          <Footer></Footer>
      </header>




    );
  }
}

export default Info
