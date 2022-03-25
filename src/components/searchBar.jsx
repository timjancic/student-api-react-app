import React, {Component} from 'react';
import {useState, useEffect} from "react";

const SearchBar = (props) => {
  const [nameField,setNameField] = useState("");
  const [tagField,setTagField] = useState("");

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Search by name"
        className="form-control border-bottom my-2"
        style={{border: "none"}}
        onChange={(e) => {
            props.onNameFilterChange(e.target.value)
          }
        }
      />
      
      <input
        type="text"
        placeholder="Search by tag"
        className="form-control border-bottom my-2"
        style={{border: "none"}}
        onChange={(e) => {
            props.onTagFilterChange(e.target.value)
          }
        }
      />
    </React.Fragment>
  );

}

export default SearchBar;
