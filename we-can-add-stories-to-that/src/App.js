import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header            from './components/header';
import Landing           from './components/landing';
import Register          from './components/register';
class App extends Component {
  render() {
    return <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing}/>
          <Route path="/register" component={Register} />
          </div>
    </BrowserRouter>
    /*
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reloade
        </p>
      </div>
    );*/
  }
}

export default App;
