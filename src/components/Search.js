import React, { useState, useEffect } from "react";
import classes from "./Search.module.css";

const Search = (props) => {
  const [searchString, setSearchString] = useState("");
  const searchHandlerFromProp = props.onSearch
  function submitHandler(event) {
    event.preventDefault();
    searchHandlerFromProp(searchString);
  }

  const focusHandler = () => props.onActivate(true);
  const blurHandler = () => props.onActivate(false);
  const changeHandler = (event) => {
    setSearchString(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("QUERY");
      searchHandlerFromProp(searchString);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [searchString]);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="query">Search</label>
        <input
          type="text"
          id="query"
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      </div>
    </form>
  );
};

export default Search;
