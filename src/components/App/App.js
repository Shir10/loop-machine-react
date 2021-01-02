import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import PadsContainer from "../PadsContainer/PadsContainer";

class App extends Component{
  render() {
      return (
          <div className="app">
              <h1>Loop Machine</h1>
              <PadsContainer />
          </div>
      );
  }
}

export default connect()(App);
