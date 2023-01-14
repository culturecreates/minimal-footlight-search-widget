import React from 'react';

import Event from './Event';
import classes from './EventsList.module.css';

const EventsList = (props) => {
 
  return (
    <ul className={classes['events-list']}>
      {props.events.slice(0,5).map((event) => (
        <Event
          key={event.id}
          title={event.title}
          startDate={event.startDate}
          image={event.image}
          place={event.place}
          city={event.city}
        />
      ))}
    </ul>
  );
};

export default EventsList;
