import React, {Component} from 'react';
import {useState, useEffect} from "react";
import Student from './student.jsx';

const DisplayStudents = (props) => {
  /* This component displays all the students given by the parent component
  *
  * props: students, studentTags, saveTag
  */

  if (props.students == undefined) {return <div>Loading Students...</div>}

  return (
    <React.Fragment>
    {
      props.students.map((student,index) => {

        if (!props.filter.includes(student.id)) {return null} //don't show student if the id of the student is not in the filter

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
