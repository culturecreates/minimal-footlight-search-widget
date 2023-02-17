import React from "react";

import Event from "./Event";
import "./EventsList.css";

const EventsList = (props) => {
  return (
    <ul className="events-list">
      {props.events.slice(0, 5).map((event) => (
        <Event key={event.id} event={event}  eventUrl={props.eventUrl} locale={props.locale}/>
      ))}
    </ul>
  );
};

export default EventsList;
