import React, { Component } from 'react';
import AppContainer from "./components/AppContainer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="py-3 bg-white text-center">
          <h1>The Ultimate TodoList | grpc | nosql</h1>
        </header>
        <AppContainer />
      </div>
    );
  }
}



export default App;
