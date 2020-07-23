import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import './App.css';
import {Home,Past} from './components'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        err : null,
        isLoaded : false,
        records: [],
    };
  }
  componentDidMount() {
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/exhibitions_and_events?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          console.log(res.records)
          this.setState({ records: res.records })
        })
        .catch(error => console.log(error))
  }

render() {
  const { records } = this.state;
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
                <Home/>
        </Route>
        <Route path="/past">
                <Past records={records}/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

}

export default App;
