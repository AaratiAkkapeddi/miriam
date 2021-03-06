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
import {Gridview} from '../';

class Past extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listview:true
    };
    this.showList = this.showList.bind(this);
    this.showGrid = this.showGrid.bind(this);
    this.search = this.search.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
   }
  search(event){
    let currentClass = event.target.value;
    let all = document.getElementsByClassName('list-item')

      console.log('here')
    for (var i = all.length - 1; i >= 0; i--) {
        all[i].classList.remove('on')
         if(all[i].getElementsByTagName("h1")[0].innerHTML.toLowerCase().includes(currentClass.toLowerCase()) || (all[i].getElementsByClassName("people")[0] && all[i].getElementsByClassName("people")[0].innerHTML.toLowerCase().includes(currentClass.toLowerCase()))){
          all[i].classList.add('on')
         }

    }
   
     
  }
   componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll(){
    document.getElementsByClassName('App-header');
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if(scrollTop > 0){
      document.getElementsByClassName('App-header')[0].classList.add('small-header')
    } else{
      document.getElementsByClassName('App-header')[0].classList.remove('small-header')
    }
  }
  // componentWillUnmount() {
  //     window.removeEventListener('scroll', this.handleScroll);
  // }
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
  published = published.sort(function (a, b) {
  if (a.fields.StartDate > b.fields.StartDate) return -1;
  if (a.fields.StartDate < b.fields.StartDate) return 1;
  return 0;
});
    const {listview} = this.state
    return (

     <header className={listview ? "App-header pastpage " : "App-header pastpage" }>
         <div className='whitearea'>
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <div className='header text-large'> Archive </div>
          <div className='sub-menu'>
            <button onClick={this.showList} className={listview ? 'text-small on' : 'text-small'}>list view</button>
            <button onClick={this.showGrid} className={listview ? 'text-small' : 'text-small on'}>grid view</button>
            <div className='search'><div className='search-text baskerville text-small'>Search</div><input onChange={this.search} type='text'/><div className='letsgo'><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 86.6"><defs></defs><polygon  points="75 43.3 0 0 0 86.6 75 43.3"/></svg></div></div>
          </div>
          </div>
          <div className='main-area'>
            <div className='view-space'>
           
            {!listview ? <Gridview tense="past" records={published}></Gridview> :
              <Listview tense="past" records={published}></Listview>
            }
            </div>
          </div>
          <Footer></Footer>
      </header>




    );
  }
}

export default Past
