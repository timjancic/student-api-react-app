import React, {Component} from "react";
import { useState, useEffect } from "react";
import './App.css';
import Student from './components/student.jsx'

function App() {
  const [students, setStudents] = useState([]);
  const [studentsFiltered, setStudentsFiltered] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");


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
    <div>
      <Student
        student={students[0]}
      />
    </div>
  );


}

export default App;
