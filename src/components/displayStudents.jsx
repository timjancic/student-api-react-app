import React, {Component} from 'react';
import {useState, useEffect} from "react";
import Student from './student.jsx';

const DisplayStudents = (props) => {
  /* This component displays all the students given by the parent component
  *
  * props: students, studentTags, saveTag
  */

  if (props.students == undefined) {return null}

  return (
    <React.Fragment>
    {
      props.students.map((student,index) => {
        return (
          <Student
            key={student.id + "-" + index}
            student={student}
            tagList={props.studentTags[student.id]}
            onSaveTag={props.onSaveTag}
          />
        )
      })
    }
    </React.Fragment>

  );
}

export default DisplayStudents
