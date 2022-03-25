import React, {Component} from "react";
import { useState, useEffect } from "react";
import './App.css';
import Student from './components/student.jsx';
import DisplayStudents from './components/displayStudents.jsx';

// <Student
//   student={students[0]}
//   tagList={studentTags[students[0].id]}
//   saveTag={handleSaveTag}
// />
// <Student
//   student={students[1]}
//   tagList={studentTags[students[1].id]}
//   saveTag={handleSaveTag}
// />

function App() {
  const [students, setStudents] = useState([]);
  const [studentTags,setStudentTags] = useState({});
  const [studentsFiltered, setStudentsFiltered] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  async function getStudentsData() {
    fetch('https://api.hatchways.io/assessment/students')
    .then(res => res.json())//response type
    .then(data => {
      //console.log(data.students);
      setStudents(data.students);
      //setStudentsFiltered(data.students);

      //create map where the student id is the key and an array of tags is the value, initialize with empty array
      let tempTags = {};
      for (let i = 0; i < data.students.length; i++) {
        tempTags[data.students[i].id] = [];
      }
      //console.log(tempTags);
      setStudentTags(tempTags);
    });
  }

  function handleSaveTag(newTag,id) {
    const newTagArray = [...studentTags[id],newTag];
    console.log(newTagArray);
    let newStudentTags = {...studentTags};
    newStudentTags[id] = newTagArray;
    setStudentTags(newStudentTags);
  }

  //call function once per render
  useEffect(() => {
    getStudentsData();
  }, []);

  if (!students.length) { return (<div> Loading student information from database... </div>) }

  return (
    <div className="vh-100 d-flex align-items-center" style={{background: "#f3f3f3"}}>
      <div className="container bg-white border rounded overflow-auto shadow" style={{width: "800px", height: "600px"}}>
        <DisplayStudents
          students={students}
          studentTags={studentTags}
          onSaveTag={handleSaveTag}
        />
      </div>
    </div>
  );


}

export default App;
