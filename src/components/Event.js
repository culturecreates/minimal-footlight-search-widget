import React from "react";

import "./Event.css";

const Event = (props) => {
  const clickEventHandler = (event) => {
    window.location.href = props.eventUrl + event.currentTarget.id;
  };
  const options = { weekday: 'short', month: 'short', day: 'numeric' };

  let startDate, endDate ;
  if (props.event.startDate) {
    startDate = new Date(props.event.startDate.substring(0,10)).toLocaleDateString('fr', options).toUpperCase();
  }
 
  if (props.event.endDate) {
     endDate = new Date(props.event.endDate.substring(0,10)).toLocaleDateString('fr', options).toUpperCase();
  }

  return (
    <div
      id={props.event.id}
      className="container"
      onClick={(e) => clickEventHandler(e)}
    >
      <img alt="entity representation" src={props.event.image}></img>
      <div className="details">
        <div className="title">{props.event.title}</div>
        <div className="date">
          {startDate}
          {props.event.endDate && "   -   " + endDate}
        </div>
        <div className="place">
          {props.event.place}
          {props.event.city && ", " + props.event.city}
        </div>
      </div>
    </div>
  );
};

export default Event;
