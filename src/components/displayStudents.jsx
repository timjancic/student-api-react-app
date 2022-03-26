import React from 'react';
import {useState} from "react";
import Student from './student.jsx';

const DisplayStudents = (props) => {
  /*
  * This component takes all the students and displays the students according to the filter.
  *
  * props:
  *   students: this is an array of objects where each object is a students data
  *   studentTags: this is an object map that tells the student component which tags to display, if there are any for that student
  *   saveTag: This passes the function call to the parent
  *   filter: An array of student ids that tells this component which students to display
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
