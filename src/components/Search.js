import React, { useRef } from 'react';
import classes from './Search.module.css';

const Search = (props) => {

  const queryRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const q = queryRef.current.value;

    props.onSearch(q);
  }

  return (
    <form onSubmit={submitHandler}>
       <div className={classes.control}>
        <label htmlFor='query'>Search</label>
        <input type='text' id='query' ref={queryRef} />
      </div>
       </form>
  )
}

export default Search;