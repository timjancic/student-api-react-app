import React from 'react';
import {useState} from "react";

const Student = (props) => {
  /*
  * This component takes data for a single student and displays it. It also calcuates the average of the student's grades
  *
  * props:
  *   student: an object with most of the student data needed.
  *   tagList: an array of the tags that are associated with this student
  *   onSaveTag: This passes the student id and new tag string to handleSaveTag function
  */

  const [tagInput, setTagInput] = useState(""); //stores the current tag input from the tag input field
  const [showGrades, setShowGrades] = useState(false); //stores whether we are showing or hiding the grades, default we are not showing the grades

  function calculateAverage(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += parseInt(nums[i]);
    }

    return (sum / nums.length).toFixed(2)
  }

  function handleShowGrades() {
    //switch showGrades value
    showGrades ? setShowGrades(false) : setShowGrades(true);
  }

  function getGradesClass() {
    //show or hide grades depending on showGrades value
    let currentClass = (
      showGrades ? "list-unstyled px-1" : "visually-hidden");
    return currentClass;
  }

  function TagComponent(props) {
    //if currentTagList hasn't loaded yet, then return nothing. Otherwise return list of tags.
    if (props.currentTagList == undefined) {
      return null
    }
    return (
      props.currentTagList.map((tag,index) => {
        return (
          <div
          className="col-auto border me-1 p-2"
          style={{
            background: "#D9D9D9",
            borderRadius: "6px",
            overflow: "hidden"
          }}
          key={props.currentid + "-" + index + "-" + tag}
          >
            {tag}
          </div>
        );
      })
    );
  }

  return (
    <div className="d-flex">
    <div className="justify-content-end mt-2" style={{width: "20%"}}>
      <img src={props.student.pic} className="rounded-circle border" alt="avatar" style={{objectFit: "contain", width: "100%", maxWidth: "150px"}}/>
    </div>
    <div className="container" style={{maxWidth: "80%"}}>
      <div className="row justify-content-between">
        <h1 className="col ralewayFont">
          <strong>{props.student.firstName.toUpperCase()}{" "}{props.student.lastName.toUpperCase()}</strong>
        </h1>
        <button type="button" className="col-auto gradeViewBtn" onClick={handleShowGrades}>
          <strong>{showGrades ? "-" : "+"}</strong>
        </button>
      </div>

      <div className="mx-4 ralewayFont">
        <p className="my-0">Email: {props.student.email}</p>
        <p className="my-0">Company: {props.student.company}</p>
        <p className="my-0">Skill: {props.student.skill}</p>
        <p className="my-0 mb-1">Average: {calculateAverage(props.student.grades)}%</p>
        <ul className={getGradesClass()}>
          {
            props.student.grades.map((listValue, index) => {
              return (<li style={{lineHeight: "1.1"}} key={props.student.id + "-" + index + "-" + listValue}>Test {index + 1}: <span className="ms-4">{listValue}%</span></li>)
            })
          }
        </ul>
      </div>
      <div className="container mb-2">
        <div className="row justify-content-start gx-2 mx-3 ralewayFont">
          <TagComponent currentTagList={props.tagList} currentid={props.student.id}/>
        </div>
      </div>
      <div className="ms-3" style={{width: "125px"}}>
        <input
          type="text"
          className="form-control border-bottom ralewayFont"
          placeholder="Add a tag"
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              props.onSaveTag(e.target.value,props.student.id);

              setTagInput("");
              e.target.value = "";
            }
          }}
          style={{border: "none"}}
        />
      </div>
    </div>

  </div>);
}

export default Student;
