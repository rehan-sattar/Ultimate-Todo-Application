import React, { Component } from 'react';
import AppContainer from "./components/AppContainer";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header id="header" className="text-center">
          <i className="fas fa-clipboard-list mr-3"></i>The Ultimate TodoList
          <br />
          <small id="tagLine">Because management is everything.</small>
        </header>
        <AppContainer />
      </div>
    );
  }
}



export default App;
