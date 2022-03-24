import React, {Component} from "react";
import { useState, useEffect } from "react";
import './App.css';
import Student from './components/student.jsx'

function App() {
  const [students, setStudents] = useState([]);
  const [studentsFiltered, setStudentsFiltered] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");


  async function getStudentsData() {
    fetch('https://api.hatchways.io/assessment/students')
    .then(res => res.json())//response type
    .then(data => {
      //console.log(data.students);
      setStudents(data.students);
    });
  }

  //call function once per render
  useEffect(() => {
    getStudentsData();
  }, []);

  if (!students.length) { return (<div> Problem Reaching API </div>) }

  return (
    <div className="bg-secondary vh-100">
      <div className="container bg-light border" style={{width: "800px"}}>
        <Student
          student={students[0]}
        />
      </div>

    </div>
  );


}

export default App;
