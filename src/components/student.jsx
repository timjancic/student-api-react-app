import React, { Component } from 'react';

//<h2>{props.student.firstName} {props.student.lastName}</h2>

const Student = (props) => {
  console.log(props.student);

  function calculateAverage(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += parseInt(nums[i]);
    }

    return (sum/nums.length).toFixed(2)
  }

  return (
    <div>
      <img src={props.student.pic} />
      <h2>{props.student.firstName} {props.student.lastName}</h2>
      <p>Email: {props.student.email}</p>
      <p>Company: {props.student.company}</p>
      <p>Skill: {props.student.skill}</p>
      <p>Average: {calculateAverage(props.student.grades)}%</p>
      <ul>
      {props.student.grades.map(function(listValue,index){
        return <li key={listValue}>Test {index}: {listValue}%</li>
      })}
      </ul>
    </div>
  );
}

export default Student;
