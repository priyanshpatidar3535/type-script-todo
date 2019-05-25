import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

class App extends Component {

  constructor(props: {}) {
    super(props);
    this.state = {
      currentTask: "",
      tasks: []
    };
  }

  public render() {
    return (
      <div className="container" >
      </div>
    );
  }
}


export default App;
