import React from "react";
import placeImg from "../../assets/icons/Pin.svg";
import "./Event.css";

const Event = (props) => {
  const { event, eventUrl, locale } = props;
  const clickEventHandler = (e) => {
    window.open(eventUrl + e.currentTarget.id, "_blank");
  };

  const dateTimeOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
    ...dateTimeOptions,
    timeZone: "America/Montreal",
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    ...dateTimeOptions,
    timeZone: "UTC",
  });

  let startDate = "";
  let endDate = "";
  if (event.startDate) {
    let dateTime = new Date(event.startDate);
    if (event.startDate.length > 10) {
      startDate = dateTimeFormatter.format(dateTime);
    } else {
      startDate = dateFormatter.format(dateTime);
    }
  }

  if (event.endDate) {
    let dateTime = new Date(event.endDate);
    if (event.endDate.length > 10) {
      endDate = dateTimeFormatter.format(dateTime);
    } else {
      endDate = dateFormatter.format(dateTime);
    }
  }

  return (
    <div
      id={event.id}
      className="container"
      onClick={(e) => clickEventHandler(e)}
    >
      <div className="image-container">
        <img alt="entity representation" src={event.image}></img>
      </div>

      <div className="details">
        <div className="title">{event.title}</div>
        <div className="date">
          {startDate.toUpperCase().replace(",", " ") + "   "}
          {/* &nbsp; &#9135;&#9135; &nbsp; */}
          {endDate !== startDate && endDate && (
            <>&nbsp; &#9135;&#9135; &nbsp;</>
          )}
          {endDate !== startDate &&
            endDate &&
            "   " + endDate.toUpperCase().replace(",", " ")}
        </div>
        <div className="place">
          <img src={placeImg} alt="place"></img>
          {event.place}
          {/* {event.city && ", " + event.city} */}
        </div>
      </div>
    </div>
  );
};

export default Event;
