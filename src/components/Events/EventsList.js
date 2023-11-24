import React from "react";
import Event from "./Event";
import Organization from "../Organization/Organization";
import "./EventsList.css";
import { Tabs } from "../../constants/tabs";

const EventsList = (props) => {
  const { tabSelected, events, widgetProps, workshop, organizations } = props;
  let tabChoice = tabSelected;

  return (
    <ul className="events-list">
      {tabChoice === Tabs.ORGANIZATIONS &&
        organizations
          ?.slice(0, 9)
          ?.map((event) => (
            <Organization
              key={event.id}
              event={event}
              eventUrl={widgetProps.orgUrl}
              locale={widgetProps.locale}
            />
          ))}
      {tabChoice === Tabs.EVENTS &&
        events
          ?.slice(0, 9)
          ?.map((event) => (
            <Event
              key={event.id}
              event={event}
              eventUrl={widgetProps.eventUrl}
              locale={widgetProps.locale}
            />
          ))}
      {tabChoice === Tabs.WORKSHOPS &&
        workshop
          ?.slice(0, 9)
          ?.map((event) => (
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
