import React from "react";

import "./Event.css";

const Event = (props) => {
  const clickEventHandler = (event) => {
    window.location.href = props.eventUrl + event.currentTarget.id;
  };

  return (
    <div
      id={props.event.id}
      className="container"
      onClick={(e) => clickEventHandler(e)}
    >
     
      <div className="details">
        <div className="title">{props.event.title}</div>
      
        <div className="place">
          {props.event.place}
          {props.event.city && ", " + props.event.city}
        </div>
      </div>
    </div>
  );
};

export default Event;
