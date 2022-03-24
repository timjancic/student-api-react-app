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
    <div className="vh-100 d-flex align-items-center" style={{background: "#f3f3f3"}}>
      <div className="container bg-white border rounded overflow-auto shadow" style={{width: "800px", height: "600px"}}>
        <Student
          student={students[0]}
        />
        <Student
          student={students[1]}
        />
      </div>

    </div>
  );


}

export default App;
