import React from 'react';

import Event from './Event';
import './EventsList.css';

const EventsList = (props) => {
 
  return (
    <ul className='events-list'>
      {props.events.slice(0,5).map((event) => (
        <Event
          key={event.id}
          id={event.id}
          title={event.title}
          startDate={event.startDate}
          image={event.image}
          place={event.place}
          city={event.city}
          eventUrl={props.eventUrl}
        />
      ))}
    </ul>
  );
};

export default EventsList;
