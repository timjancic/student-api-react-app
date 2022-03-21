import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {}

    let dataAPI;

    //call the fetch function
    fetch('https://api.hatchways.io/assessment/students')
    .then(res => res.json())//response type
    .then(data => {
      //console.log(data);
      dataAPI = data.students;
      this.state.students = dataAPI;
    });

  }

  render () {
    return (
      <div className="App">
        <p>Placeholder</p>
      </div>
    );
  }

}

export default App;
