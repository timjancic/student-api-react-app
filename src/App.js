import React, {Component} from "react";
import { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/searchBar.jsx';
import DisplayStudents from './components/displayStudents.jsx';

function App() {
  const [students, setStudents] = useState([]);
  const [studentTags,setStudentTags] = useState({});
  const [studentsFiltered, setStudentsFiltered] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  async function getStudentsData() {
    fetch('https://api.hatchways.io/assessment/students')
    .then(res => res.json())//response type
    .then(data => {
      //console.log(data.students);
      setStudents(data.students);

      //create map where the student id is the key and an array of tags is the value, initialize with empty array
      //initialize filter with all student ids
      let tempTags = {};
      let tempFilter = new Array(data.students.length);
      for (let i = 0; i < data.students.length; i++) {
        tempTags[data.students[i].id] = [];
        tempFilter[i] = data.students[i].id;
      }
      //console.log(tempTags);
      setStudentTags(tempTags);
      setStudentsFiltered(tempFilter);
    });
  }

  function handleSaveTag(newTag,id) {
    const newTagArray = [...studentTags[id],newTag];
    let newStudentTags = {...studentTags};
    newStudentTags[id] = newTagArray;
    setStudentTags(newStudentTags);
  }

  function handleNameFilterChange(filter) {
    setNameFilter(filter.toLowerCase());
  }

  function handleTagFilterChange(filter) {
    setTagFilter(filter.toLowerCase());
  }

  useEffect(() => {
    /*
    * this effect is attached to nameFilter and tagFilter and
    * updates which students are shown based on the filters present in
    * the search bars
    */

    let tempFilter = []; //list of ids
    let fullName;
    for (let i = 0; i < students.length; i++){
      fullName = students[i].firstName.toLowerCase() + " " + students[i].lastName.toLowerCase();
      if (fullName.includes(nameFilter) || nameFilter.length == 0) {
        tempFilter.push(students[i].id);
      }
    }

    //if there is a tag filter present, then we will create a new id filter that only includes ids that match name and tag filter
    if (tagFilter.length){
      let tempTagFilter = [];
      for (let i = 0; i < tempFilter.length; i++){
        let singleTagList = studentTags[tempFilter[i]];

        //go through each tag that this student id has and check if it contains the filter
        for (let j = 0; j < singleTagList.length; j++) {
          if (singleTagList[j].toLowerCase().includes(tagFilter)) {
            tempTagFilter.push(tempFilter[i]);
          }
        }

      }
      setStudentsFiltered(tempTagFilter);
    } else {
      //if there is no filter in the tag section then just use the filter for names
      setStudentsFiltered(tempFilter);
    }
  }, [nameFilter,tagFilter,studentTags])

  //call function once per render
  useEffect(() => {
    console.log("initializing student data")
    getStudentsData();
  }, []);

  if (!students.length) { return (<div> Loading student information from database... </div>) }

  return (
    <div className="vh-100 d-flex align-items-center" style={{background: "#f3f3f3"}}>
      <div className="container bg-white border rounded overflow-auto shadow" style={{width: "800px", height: "600px"}}>
        <SearchBar
          onNameFilterChange={handleNameFilterChange}
          onTagFilterChange={handleTagFilterChange}
        />
        <DisplayStudents
          students={students}
          studentTags={studentTags}
          onSaveTag={handleSaveTag}
          filter={studentsFiltered}
        />
      </div>
    </div>
  );


}

export default App;
