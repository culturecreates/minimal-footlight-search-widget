import React from "react";
import Event from "./Event";
import Organization from "../Organization/Organization";
import "./EventsList.css";

const EventsList = (props) => {
  const { tabSelected, events, widgetProps } = props;
  let tabChoice = tabSelected;
  
  return (
    <ul className="events-list">
      {tabChoice === "Organizations" &&
        events
          .slice(0, 5)
          .map((event) => (
            <Organization
              key={event.id}
              event={event}
              eventUrl={widgetProps.orgUrl}
              locale={widgetProps.locale}
            />
          ))}
      {tabChoice !== "Organizations" &&
        events
          .slice(0, 4)
          .map((event) => (
            <Event
              key={event.id}
              event={event}
              eventUrl={widgetProps.eventUrl}
              locale={widgetProps.locale}
            />
          ))}
    </ul>
  );
};

export default EventsList;
