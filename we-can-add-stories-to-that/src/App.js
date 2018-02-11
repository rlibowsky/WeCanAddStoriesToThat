import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Assets/canvas';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/header';
import Landing from './components/landing';
import Register from './components/register';
import Login from './components/login';

class App extends Component {
  render() {
    return <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          </div>
    </BrowserRouter>
    /*
    return (
      <div className="App">
        <Canvas />
      </div>
    );*/
  }
}

export default App;
