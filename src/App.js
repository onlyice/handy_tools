import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import IdSets from './components/id_sets';
import Numbers from './components/numbers';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="ui fixed inverted menu">
            <div className="ui container">
              <Link to="/" className="header item">Handy Tools</Link>
              <Link to="/id-sets" className="item">ID Sets</Link>
              <Link to="/numbers" className="item">Numbers</Link>
              <div className="ui simple dropdown item">
                Dropdown <i className="dropdown icon"/>
                <div className="menu">
                  <a className="item" href="#">Link Item</a>
                  <a className="item" href="#">Link Item</a>
                  <div className="divider"/>
                  <div className="header">Header Item</div>
                  <div className="item">
                    <i className="dropdown icon"/>
                    Sub Menu
                    <div className="menu">
                      <a className="item" href="#">Link Item</a>
                      <a className="item" href="#">Link Item</a>
                    </div>
                  </div>
                  <a className="item" href="#">Link Item</a>
                </div>
              </div>
            </div>
          </div>

          <div className="ui main container">
            <Route exact path="/" component={IdSets}/>
            <Route path="/id-sets" component={IdSets}/>
            <Route path="/numbers" component={Numbers}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
