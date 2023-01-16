import React from "react";

import classes from "./Event.module.css";

const Event = (props) => {
  return (
    <div className={classes.container}>
      <img alt="event" src={props.image}></img>
      <div className={classes.details}>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.date}>{props.startDate}</div>
        <div className={classes.place}>{props.place}, {props.city}</div>
      </div>
    </div>
  );
};

export default Event;
