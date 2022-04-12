import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/searchBar.jsx';
import DisplayStudents from './components/displayStudents.jsx';

function App() {
  const [students, setStudents] = useState([]); //array of student objects where all the student data is stored
  const [studentTags,setStudentTags] = useState({}); //object map where the student id is the key and an array is the list of tags for the student with the associated id
  const [studentsFiltered, setStudentsFiltered] = useState([]); //array of student ids, whichever ids are present in this array are the students that are shown.
  const [nameFilter, setNameFilter] = useState(""); //stores the value of name search bar, when this updates the student filter updates
  const [tagFilter, setTagFilter] = useState(""); //stores the value of the tag search bar, when this updates, the student filter updates

  async function getStudentsData() {
    /*
    * This function gets called on page load. It fetches the student data from the api and then
    * sets the hook variables that will be used to display the students.
    */

    fetch('https://api.hatchways.io/assessment/students')
    .then(res => res.json())//response type
    .then(data => {

      //assign array of students
      setStudents(data.students);

      //create map where the student id is the key and an array of tags is the value, initialize with empty array
      //also make filter with all student ids so all the students get shown on load
      let tempTags = {};
      let tempFilter = new Array(data.students.length);
      for (let i = 0; i < data.students.length; i++) {
        tempTags[data.students[i].id] = [];
        tempFilter[i] = data.students[i].id;
      }

      //set both the student tags (empty on load) and the student filter (contains all student ids on load)
      setStudentTags(tempTags);
      setStudentsFiltered(tempFilter);
    });
  }

  function handleSaveTag(newTag,id) {
    /*
    * Creates new array that is a copy of the student tags and then concatenates the new tag that is passed to it.
    * Uses id to find correct student
    */
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
    * the search bars. Performs simple linear search.
    */

    let tempFilter = []; //list of ids
    let fullName; //will be used for student.firstName + student.lastName
    for (let i = 0; i < students.length; i++){
      fullName = students[i].firstName.toLowerCase() + " " + students[i].lastName.toLowerCase();
      if (fullName.includes(nameFilter) || nameFilter.length == 0) {
        tempFilter.push(students[i].id);
      }
    }

    //if there is a tag filter present, then we will create a new id filter that only includes ids that match name and tag filter
    if (tagFilter.length){
      let tempTagFilter = []; //list of ids
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

  //call function once per page load.
  useEffect(() => {
    console.log("initializing student data")
    getStudentsData();
  }, []);

  //if there are no students that have been loaded, display below.
  if (!students.length) { return (<div> Loading student information from database... </div>) }

  return (
    <div className="vh-100 d-flex align-items-center" style={{background: "#f3f3f3"}}>
      {/*Container size is set to best match demo, but can easily be changed to a percentage of screen width/height*/}
      <div className="container bg-white border rounded shadow studentContainer" style={{maxWidth: "900px"}}>
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
