import React from 'react';
import {useState} from "react";

const SearchBar = (props) => {
  /*
  * This component hosts both the name search bar and the tag search bar. It doesn't store anything locally
  * but passes whatever the value is to the parent component
  *
  * props:
  *   onNameFilterChange: links to handleNameFilterChange, passes the value of the name search bar to that function
  *   onTagFilterChanges: Links to handleTagFilterChange, passes the value of the tag search bar to that function
  */

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Search by name"
        className="form-control border-bottom my-2 ralewayFont"
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
