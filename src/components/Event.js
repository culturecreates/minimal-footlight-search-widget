import React from "react";

import "./Event.css";

const Event = (props) => {
  const clickEventHandler = (event) => {
    console.log(props.eventUrl + event.currentTarget.id);
    window.location.href = props.eventUrl + event.currentTarget.id;
  };
  return (
    <div
      id={props.id}
      className='container'
      onClick={(e) => clickEventHandler(e)}
    >
      <img alt='event' src={props.image}></img>
      <div className='details'>
        <div className='title'>{props.title}</div>
        <div className='date'>{props.startDate}</div>
        <div className='place'>
          {props.place}
          {props.city && ', ' + props.city}
        </div>
      </div>
    </div>
  );
};

export default Event;
