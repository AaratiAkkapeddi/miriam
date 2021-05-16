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
class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info:null
    };
   }
   componentDidMount() {
    fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/info?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
      .then(res => res.json())
      .then(res => {
        this.setState({ info: res.records })
      })
      .catch(error => console.log(error))

    }


   render() {
     const {info} = this.state
    return (

     <footer style={this.props.style}>
     <div className='row'>
        <div className='col-6 col-sm-3'>
          <h1 className='text-small'>Miriam</h1>
          <p className='text-tiny baskerville'>gallery + bookshop<br/><a style={{textDecoration:"none", border:"none"}} href="https://www.instagram.com/miriam.gallery/">@miriam.gallery</a></p>
        </div>
        <div className='col-6 col-sm-3'>
          <p className='text-tiny baskerville'>319 Bedford Ave,<br/>Williamsburg<br/>Brooklyn, NY 11211</p>
        </div>
        <div className='col-6 col-sm-3'>
            <div className='text-tiny baskerville'>
            {info &&
              <ReactMarkdown className="col-6 col-lg-12" children={info[0].fields.HoursText} />
            }
           
            </div>
        </div>
        <div className='col-6 col-sm-3'>
            <p className='text-tiny baskerville'><a target="_blank" href='https://mailchi.mp/0a822e78bfa8/miriammailinglist'>Join Our Mailing List</a><br/>hello@miriamgallery.com</p>
        </div>
        </div>
      </footer>




    );
  }
}

export default Footer
