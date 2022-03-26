import React, {Component} from 'react';
import {useState, useEffect} from "react";

const Student = (props) => {
  const [tagInput, setTagInput] = useState("");
  const [showGrades, setShowGrades] = useState(false);

  function calculateAverage(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += parseInt(nums[i]);
    }

    return (sum / nums.length).toFixed(2)
  }

  function handleShowGrades() {
    showGrades ? setShowGrades(false) : setShowGrades(true);
  }

  function getGradesClass() {
    let currentClass = (
      showGrades ? "list-unstyled px-1" : "visually-hidden");
    return currentClass;
  }

  function TagComponent(props) {
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
            borderRadius: "6px"
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
    <div className="justify-content-end mt-2">
      <img src={props.student.pic} className="rounded-circle border" alt="avatar" width="150" height="150"/>
    </div>
    <div className="container">
      <div className="row justify-content-between">
        <h1
          className="col ralewayFont"
        >
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
