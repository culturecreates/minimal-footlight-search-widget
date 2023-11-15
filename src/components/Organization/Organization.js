import React from "react";
import "../Events/Event.css";
import placeImg from "../../assets/icons/Pin.svg";

const Event = (props) => {
  const { eventUrl, event } = props;
  const clickEventHandler = (e) => {
    window.open(eventUrl + e.currentTarget.id, "_blank");
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
          {event.streetAddress&&<img src={placeImg} alt="place"></img>}
          {event.streetAddress}
          {event.city && ", " + event.city}
        </div>
      </div>
    </div>
  );
};

export default Event;
