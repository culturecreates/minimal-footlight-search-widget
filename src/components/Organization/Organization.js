import React from "react";
import "../Events/Event.css";

const Event = (props) => {
  const { eventUrl, event } = props;
  const clickEventHandler = (e) => {
    window.location.href = eventUrl + e.currentTarget.id;
  };

  return (
    <div
      id={event.id}
      className="container"
      onClick={(e) => clickEventHandler(e)}
    >
      <div className="details">
        <div className="title">{event.title}</div>

        <div className="place">
          {event.streetAddress}
          {event.city && ", " + event.city}
        </div>
      </div>
    </div>
  );
};

export default Event;
