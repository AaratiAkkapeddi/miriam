import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import './App.css';
import {Home,Info,Press, Past,Present,Future,Happening,Navigation,Homepreview, Mainmenu, AnnouncementPage, ExhibitionPage} from './components'
const NoMatchPage = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Mainmenu></Mainmenu>
      <img className='oops-image' src='https://res.cloudinary.com/drik2e1su/image/upload/v1666708867/Info/paint-bear-png_i8szoi'/>
      <h3 className='oops-message text-large'>Woops! This page does not exist. Maybe try going <a className='link' href='/'>Home</a>?</h3>
    </div>
  );
};
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        err : null,
        isLoaded : false,
        records: [],
        announcements: [],
        info:[],
        events: []
    };
    this.closeLightbox = this.closeLightbox.bind(this);
  }
  closeLightbox(e){
    var el = e.target.closest('#light-box');
    el.classList.remove('on')
  }
  componentDidMount() {
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/exhibitions', { headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_PAT })})
        .then(res => res.json())
        .then(res => {
          this.setState({ records: res.records })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/announcements',{ headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_PAT })})
        .then(res => res.json())
        .then(res => {
          this.setState({ announcements: res.records })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/events',{ headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_PAT })})
        .then(res => res.json())
        .then(res => {
          this.setState({ events: res.records })
        })
        .catch(error => console.log(error))      
  }


render() {
  const { records,info, announcements, events } = this.state;
  records.forEach(function (element) {
  element.type = "exhibition";
});
  announcements.forEach(function (element) {
  element.type = "announcements";
});
  events.forEach(function (element) {
  element.type = "event";
});

  const everything = records.concat(announcements).concat(events);

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home info={info} records={records}/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/info">
          <Info/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/press">
          <Press/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/home-preview">
          <Homepreview info={info} records={records}/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/past">
          <Past info={info} records={everything}/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/current">
          <Present info={info} records={everything}/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/upcoming">
          <Future info={info} records={everything}/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/exhibition/:id">
          <ExhibitionPage info={info} records={records}/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/event/:id">
          <Happening info={info} records={events}/>
          <div id='light-box'><div onClick={this.closeLightbox} className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route exact path="/announcement/:id">
          <AnnouncementPage info={info} records={announcements}/>
          <div id='light-box'><div onClick={this.closeLightbox}  className='close'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.47 71.47"><defs></defs><title>Close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.35" y1="71.12" x2="71.12" y2="0.35"/><line className="cls-1" x1="71.12" y1="71.12" x2="0.35" y2="0.35"/></g></g></svg></div><div className='inner'></div></div>
        </Route>
        <Route component={NoMatchPage} />
      </Switch>
    </div>
    </Router>
  );
}

}

export default App;
