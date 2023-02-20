import React from "react";

import "./Event.css";

const Event = (props) => {
  const clickEventHandler = (event) => {
    window.location.href = props.eventUrl + event.currentTarget.id;
  };

  const dateTimeOptions = { 
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const dateTimeFormatter = new Intl.DateTimeFormat(props.locale, {
    ...dateTimeOptions,
    timeZone: "America/Montreal",
  });

  const dateFormatter = new Intl.DateTimeFormat(props.locale, {
    ...dateTimeOptions,
    timeZone: "UTC",
  });

  let startDate = "";
  let endDate = "";
  if (props.event.startDate) {
    let dateTime = new Date(props.event.startDate)
    if (props.event.startDate.length > 10) {
      startDate = dateTimeFormatter.format(dateTime);
    } else {
      startDate = dateFormatter.format(dateTime);
    }
  }

  if (props.event.endDate) {
    let dateTime = new Date(props.event.endDate)
    if (props.event.endDate.length > 10) {
      endDate = dateTimeFormatter.format(dateTime);
    } else {
      endDate = dateFormatter.format(dateTime);
    }
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
          {startDate.toUpperCase()}
          {endDate !== startDate && endDate && "   -   " + endDate.toUpperCase()}
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
