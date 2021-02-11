import React, { Component } from 'react';
import './style.css';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {Slider} from '../';
import {Menutrigger} from '../';


class Homecarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextslide:false,
      carousel_slides: [],
      carousel:null,
      prevslide:false,
      currentIndex:"no",
      
    };
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.handler = this.handler.bind(this);
    this.showClick = this.showClick.bind(this);
    this.hideClick = this.hideClick.bind(this);
    this.showNext = this.showNext.bind(this);
    this.hideNext = this.hideNext.bind(this);
    this.showPrev = this.showPrev.bind(this);
    this.hidePrev = this.hidePrev.bind(this);
    // this.showLeft = this.showLeft.bind(this);
    // this.showRight = this.showRight.bind(this);
    // this.moveLeft = this.moveLeft.bind(this);
    // this.moveRight = this.moveRight.bind(this);
   }

   componentDidMount() {
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/homepage_carousel?view=main&api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          this.setState({ carousel_slides: res.records })
          console.log(res.records)
        })
        .catch(error => console.log(error))

      let clickCursor = document.getElementById("click-cursor");
      document.addEventListener('mousemove', (e) => {
          clickCursor.style.left = `${e.clientX - 70}px`
          clickCursor.style.top = `${e.clientY - 80}px`
        });
     let nextCursor = document.getElementById("next-cursor");
      document.addEventListener('mousemove', (e) => {
          nextCursor.style.left = `${e.clientX - 70}px`
          nextCursor.style.top = `${e.clientY - 80}px`
        });
      let prevCursor = document.getElementById("prev-cursor");
      document.addEventListener('mousemove', (e) => {
          prevCursor.style.left = `${e.clientX - 70}px`
          prevCursor.style.top = `${e.clientY - 80}px`
        });
    }
  showClick(){

    let clickCursor = document.getElementById("click-cursor");

    clickCursor.style.opacity = "1";
    console.log(clickCursor)
  }
  showNext(){
    let nextCursor = document.getElementById("next-cursor");
    nextCursor.style.opacity = "1";
  }
  showPrev(){
    let prevCursor = document.getElementById("prev-cursor");
    prevCursor.style.opacity = "1";
  }
  hideClick(){
    console.log('hi')
    let clickCursor = document.getElementById("click-cursor");
    clickCursor.style.opacity = "0";
  }
  hideNext(){
    let nextCursor = document.getElementById("next-cursor");
    nextCursor.style.opacity = "0";
  }
  hidePrev(){
    let prevCursor = document.getElementById("prev-cursor");
    prevCursor.style.opacity = "0";
  }
  handler(){

    const slides = document.getElementsByClassName('carousel-slide');
       for (var i = slides.length - 1; i >= 0; i--) {
         if(slides[i].classList.contains('selected')){
           if(i == 0){
            this.setState({currentIndex: i})
           }else{
            this.setState({currentIndex: i})
           }
           
         }
       }
  }

  goNext(){

       const slides = document.getElementsByClassName('carousel-slide');
       for (var i = slides.length - 1; i >= 0; i--) {
         if(slides[i].classList.contains('is-selected')){
          if(i == slides.length-1){
           this.setState({currentIndex: 0})
          }else{
            console.log(i)
            this.setState({currentIndex: (i) + 1})
          }
         }
       }
       // this.setState({ nextslide: true })
       // this.setState({ nextslide: false })
      
    }
    goPrev(){
      console.log('prev')
       const slides = document.getElementsByClassName('carousel-slide');
       for (var i = slides.length - 1; i >= 0; i--) {
         if(slides[i].classList.contains('is-selected')){
           if(i == 0){
            this.setState({currentIndex: slides.length - 1})
           }else{
            console.log(i - 1)
            this.setState({currentIndex: i - 1})
           }
           
         }
       }
      
    }

   render() {
   	const { carousel_slides, carousel, currentIndex } = this.state;

   
    const flickityOptions = {
    	cellAlign:'left',
    	contain:true
    }
    const slides = carousel_slides.length > 0 ? carousel_slides.map((x,i)=>{
      if(x.fields.public){
        if(x.fields.TileBg){
           var divStyle = {
            backgroundColor: x.fields.BackgroundColor,
            backgroundImage: (x.fields.BackgroundImage ? 'url(' + x.fields.BackgroundImage[0].url + ')' : 'none'),
            backgroundRepeat:"repeat",
            backgroundSize: "10vw"
          }
        }else{
          var divStyle = {
            backgroundColor: x.fields.BackgroundColor,
            backgroundImage: (x.fields.BackgroundImage ? 'url(' + x.fields.BackgroundImage[0].url + ')' : 'none')
          }
        }
      
      var logoStyle = {
      	backgroundColor: x.fields.LogoBackgroundColor,
      	color: x.fields.LogoColor
      }
      var headlineStyle = {
      	color: x.fields.HeadlineColor
      }
      var subheadlineStyle = {
      	color: x.fields.SubHeadlineColor
      }
      var descriptionStyle = {
      	color: x.fields.DescriptiveCopyColor
      }
  var borderStyle = {
        borderColor: x.fields.LogoBackgroundColor,
      }
      var myborderStyle = {
        borderColor: x.fields.HeadlineColor,
      }
      var mySVGStyle = {
        stroke: x.fields.HeadlineColor,
      }
      if(x.fields.Headline){
      return(

        
        <div style={divStyle} key={x.id} className={i == 0 ? 'carousel-slide is-selected':'carousel-slide'}>
          {!x.fields.Slidelink ? 
            <div>
           <div className='prev-invisible invisible-block' onMouseOver={this.showPrev}  onMouseOut={this.hidePrev} onClick={this.goPrev} ></div>
          <div className='next-invisible invisible-block' onMouseOver={this.showNext} onMouseOut={this.hideNext} onClick={this.goNext} ></div>
          <Menutrigger style={logoStyle}></Menutrigger>
          <h1 style={headlineStyle} className='text-large baskerville title'>{x.fields.Headline}</h1>
           {!x.fields.HeroImage ? '' :

            
            <div className={x.fields.HeroImageStyle}><img className='carousel-slide-image' alt='hero image' src={x.fields.HeroImage[0].url}/></div>
           
            
          }
          <div>
          {!x.fields.SubHeading ? '' :
          <h1 style={subheadlineStyle} className='text-large baskerville'><ReactMarkdown source={x.fields.SubHeading} /></h1>
        }
        {!x.fields.DescriptiveCopy ? '' :
          <div style={descriptionStyle} className='description text-medium'><ReactMarkdown source={x.fields.DescriptiveCopy} /></div>
        }
        </div>

        </div>
        : 
        <div>

           <div className='prev-invisible invisible-block' onMouseOver={this.showPrev}  onMouseOut={this.hidePrev} onClick={this.goPrev} ></div>
          <div className='next-invisible invisible-block' onMouseOver={this.showNext} onMouseOut={this.hideNext} onClick={this.goNext} ></div>
          <Menutrigger style={logoStyle}></Menutrigger>
          <a onMouseOver={this.showClick}  onMouseOut={this.hideClick} href={x.fields.Slidelink} className="sixtypercent"></a>
          <div><a  onMouseOver={this.showClick}  onMouseOut={this.hideClick} href={x.fields.Slidelink} ><h1 style={headlineStyle} className='text-large baskerville title'>{x.fields.Headline}</h1></a></div>
           {!x.fields.HeroImage ? '' :
           <div> <a  onMouseOver={this.showClick}  onMouseOut={this.hideClick}  href={x.fields.Slidelink} > <div className={x.fields.HeroImageStyle}><img className='carousel-slide-image' alt='hero image' src={x.fields.HeroImage[0].url}/></div></a></div>
          }
          {!x.fields.SubHeading ? '' :
          <div><a  onMouseOver={this.showClick}  onMouseOut={this.hideClick}  href={x.fields.Slidelink} ><h1 style={subheadlineStyle} className='text-large baskerville'>{x.fields.SubHeading}</h1></a></div>
        }
        {!x.fields.DescriptiveCopy ? '' :
         <div> <a  onMouseOver={this.showClick}  onMouseOut={this.hideClick}  href={x.fields.Slidelink} ><div style={descriptionStyle} className='description text-medium'><ReactMarkdown source={x.fields.DescriptiveCopy} /></div></a></div>
        }
          <div style={myborderStyle} className='mobile-controls'><svg onClick={this.goPrev} width="43" height="51" viewBox="0 0 43 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={mySVGStyle} d="M42.25 49.3157L0.999999 25.5L42.25 1.6843L42.25 49.3157Z" stroke="black"/>
            </svg>
            <span style={headlineStyle}> </span>
            <svg onClick={this.goNext} width="43" height="51" viewBox="0 0 43 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={mySVGStyle} d="M42.25 49.3157L0.999999 25.5L42.25 1.6843L42.25 49.3157Z" stroke="black"/>
            </svg>
            </div>
        </div>
         }
        </div>

       )}
     }
      }) : 'loading'
  


    return (

     <header className="App-header">
        <svg id="click-cursor" className="click-cursors" width="128" height="128" viewBox="0 0 128 128" fill="none" >
          <g clip-path="url(#clip0)">
          <path d="M63.886 17.2166L127.873 128.046H-0.101151L63.886 17.2166Z" fill="white"/>
          <path d="M65.4287 55.3467C68.82 55.3467 71.7198 56.8212 73.784 58.8854L78.06 54.3637C74.9636 51.3657 70.5893 49.4489 65.4779 49.4489C54.7634 49.4489 47.3419 57.2635 47.3419 67.1424C47.3419 77.0214 54.8617 84.836 65.5762 84.836C71.8672 84.836 76.9787 82.1328 80.0259 78.2501L75.4551 74.1707C73.44 76.7756 70.1962 78.9382 65.7236 78.9382C59.0885 78.9382 53.977 73.8267 53.977 67.1424C53.977 60.6056 58.8919 55.3467 65.4287 55.3467Z" fill="black"/>
          <path d="M36.7634 84.0199H30.374V118.916H36.7634V84.0199Z" fill="black"/>
          <path d="M49.064 95.0784H42.6747V118.916H49.064V95.0784ZM41.6917 86.6248C41.6917 88.9348 43.5594 90.7041 45.8693 90.7041C48.1793 90.7041 50.047 88.9348 50.047 86.6248C50.047 84.3148 48.1793 82.5454 45.8693 82.5454C43.5594 82.5454 41.6917 84.3148 41.6917 86.6248Z" fill="black"/>
          <path d="M71.6859 110.364C70.6538 111.936 68.5896 113.509 65.9847 113.509C62.1019 113.509 59.3987 110.757 59.3987 107.022C59.3987 103.385 62.1511 100.485 65.8372 100.485C68.1472 100.485 70.064 101.664 71.3419 103.335L75.8636 99.3543C73.6519 96.5037 69.9657 94.5869 65.8372 94.5869C58.5632 94.5869 53.0094 100.092 53.0094 107.022C53.0094 113.902 58.4157 119.407 65.7881 119.407C70.2606 119.407 73.7993 117.785 76.6008 114.05L71.6859 110.364Z" fill="black"/>
          <path d="M103.635 95.0784H94.6404L86.4325 102.795V84.0199H80.0432V118.916H86.4325V108.594L96.508 118.916H105.109L91.9863 105.793L103.635 95.0784Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="128" height="128" fill="white"/>
          </clipPath>
          </defs>
          </svg>
        <svg id="next-cursor" className="click-cursors" width="128" height="128" viewBox="0 0 128 128" fill="none">
          <g clip-path="url(#clip0)">
          <path d="M110.772 63.6668L-0.0565704 127.654L-0.0565648 -0.320394L110.772 63.6668Z" fill="white"/>
          <path d="M7.51482 64.1173H14.1499V41.7054L33.318 64.1173H37.9871V29.7131H31.352V52.1249L12.184 29.7131H7.51482V64.1173Z" fill="black"/>
          <path d="M26.4187 94.4552C26.0541 96.0845 24.9431 98.4853 22.6021 99.8369C19.6652 101.533 16.1691 100.884 14.2001 98.1612L28.5017 89.9042C28.3165 89.3869 28.0396 88.809 27.7201 88.2556C24.4026 82.5095 17.5821 80.0343 11.8785 83.3273C5.74923 86.866 4.73311 94.1494 8.05066 99.8956C11.786 106.365 18.8829 107.943 25.0547 104.38C28.247 102.537 30.7627 99.325 31.387 95.7864L26.4187 94.4552ZM12.1209 93.9702C11.2951 91.9499 12.1603 89.1235 14.4588 87.7965C16.7147 86.4941 19.4068 87.3234 20.6338 89.0553L12.1209 93.9702Z" fill="black"/>
          <path d="M28.7934 74.129L22.4513 77.7905L34.9431 83.4044L33.391 98.9994L39.9458 95.2149L40.7679 85.4329L49.6505 89.6119L56.2053 85.8275L41.9236 79.3742L43.3078 65.7491L36.9657 69.4107L36.2708 77.6437L28.7934 74.129Z" fill="black"/>
          <path d="M70.5185 71.321C70.1846 71.6273 69.1942 72.3694 68.3855 72.8363C67.0234 73.6227 65.9084 73.7557 64.9865 73.4367C64.1988 73.1536 63.5436 72.5104 62.8064 71.2334L58.2601 63.3591L65.0704 59.4272L62.3672 54.7451L55.5569 58.677L52.2394 52.9309L46.7061 56.1255L50.0236 61.8717L44.2774 65.1892L46.9806 69.8713L52.7268 66.5537L56.9044 73.7897C58.6001 76.7266 60.125 78.2865 62 79.0768C64.4859 80.1386 67.551 79.8446 70.871 77.9278C71.9351 77.3134 73.4968 76.1847 74.073 75.5116L70.5185 71.321Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="128" height="128" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <svg id="prev-cursor" className="click-cursors" width="128" height="128" viewBox="0 0 128 128" fill="none" >
          <g clip-path="url(#clip0)">
          <path d="M17 63.8861L127.829 -0.101094L127.829 127.873L17 63.8861Z" fill="white"/>
          <path d="M81.6213 65.0065C81.0745 64.5773 80.6555 64.2219 79.8468 63.755C77.3355 62.3051 74.5144 61.9816 72.3953 62.8013L73.5995 60.7156L68.2789 57.6438L56.3604 78.2874L61.8937 81.4821L69.3889 68.5C70.7826 67.6589 73.7055 67.0196 76.1317 68.4203C76.9404 68.8872 77.7 69.4393 78.0093 69.7881L81.6213 65.0065Z" fill="black"/>
          <path d="M89.845 89.0502C88.2517 89.5491 85.6171 89.7873 83.2761 88.4357C80.3391 86.7401 79.1531 83.388 80.5262 80.3216L94.8278 88.5786C95.1832 88.1596 95.5452 87.6308 95.8647 87.0775C99.1823 81.3313 97.9156 74.187 92.212 70.894C86.0827 67.3553 79.2671 70.117 75.9495 75.8632C72.2142 82.3329 74.3962 89.268 80.568 92.8313C83.7604 94.6743 87.7996 95.2471 91.1763 94.0185L89.845 89.0502ZM83.1162 76.4255C84.4528 74.7001 87.3332 74.0362 89.6317 75.3633C91.8876 76.6657 92.5154 79.4118 91.629 81.3404L83.1162 76.4255Z" fill="black"/>
          <path d="M107.476 80.2744L101.73 76.9568L99.3033 103.081L103.134 105.292L124.544 90.1287L118.798 86.8111L105.863 96.1417L107.476 80.2744Z" fill="black"/>
          <path d="M110.283 53.1211C114.706 53.2235 117.384 52.2039 119.297 50.2817C121.057 48.5526 122.101 45.922 122.164 43.2196C122.227 40.5171 121.305 37.841 119.626 36.0323C117.757 33.9734 115.178 32.8321 110.755 32.7298L97.8327 32.4307L97.0366 66.8256L103.67 66.9792L103.994 52.9755L110.283 53.1211ZM104.13 47.0792L104.33 38.4805L110.324 38.6192C112.584 38.6716 113.702 39.2382 114.469 40.0917C115.188 40.8949 115.557 41.9359 115.531 43.066C115.504 44.1961 115.089 45.1697 114.333 45.9389C113.528 46.756 112.385 47.2703 110.125 47.218L104.13 47.0792Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="128" height="128" fill="white"/>
          </clipPath>
          </defs>
          </svg>


       <Slider
            action={this.handler}
            currentIndex={currentIndex}
            options={{
              on:{change:this.props.action},
              autoPlay: 6000,
              pauseAutoPlayOnHover: true,
              wrapAround: true,
              fullscreen: true,
              adaptiveHeight: true,
              pageDots: false,
              prevNextButtons:false,
              draggable:false,
        arrowShape: "M1.9,49.9h96.9 M17.1,34.4C12.4,39.3,6,45.8,1.8,49.9l15.3,15.7"
            }}
          >
    {slides}

    </Slider>



      </header>




    );
  }
}

export default Homecarousel
