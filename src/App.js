import React, {Component} from 'react';

import Navbar from './components/navbar';
import IdSets from './components/id_sets';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="ui main container">
          <IdSets />
        </div>
      </div>
    );
  }
}

export default App;
