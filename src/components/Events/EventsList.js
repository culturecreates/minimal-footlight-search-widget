import React from "react";
import Event from "./Event";
import Organization from "../Organization/Organization";
import "./EventsList.css";

const EventsList = (props) => {
  let tabChoice = props.tabSelected;

  return (
    <ul className="events-list">
      {tabChoice === "Organizations" &&
        props.events
          .slice(0, 5)
          .map((event) => (
            <Organization
              key={event.id}
              event={event}
              eventUrl={props.widgetProps.orgUrl}
              locale={props.widgetProps.locale}
            />
          ))}
      {tabChoice !== "Organizations" &&
        props.events
          .slice(0, 5)
          .map((event) => (
            <Event
              key={event.id}
              event={event}
              eventUrl={props.widgetProps.eventUrl}
              locale={props.widgetProps.locale}
            />
          ))}
    </ul>
  );
};

export default EventsList;
