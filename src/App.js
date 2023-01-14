import React, { useState, useEffect, useCallback } from "react";

import EventsList from "./components/EventsList";
import Search from "./components/Search";
import SearchFooter from "./components/SearchFooter";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchMoviesHandler = useCallback(async (q) => {
    setIsLoading(true);
    setError(false);
    let url =
      "https://api.footlight.io/calendars/tout-culture/events?page=1&limit=1000";
    if (q) {
      url += "&query=" + q;
    }
    try {
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);

      const transformedEvents = data.data.map((eventData) => {
        return {
          id: eventData.id,
          title: eventData.name.fr,
          image: eventData.image.thumbnail,
          place: eventData.location[0].name.fr,
          startDate: eventData.startDate || eventData.startDateTime,
          city: eventData.location[0].address.addressLocality.fr,
        };
      });
      setEvents(transformedEvents);
      setTotalCount(data.meta.totalCount);
      console.log("totalCount:" + totalCount);
    } catch {
      setError(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler, setTotalCount]);

  function searchHandler(q) {
    fetchMoviesHandler(q);
    console.log(q);
  }

  let content = <p>No results.</p>;
  if (events.length > 0) {
    content = (
      <>
        <EventsList events={events} />
        {events.length > 5 && <SearchFooter count={totalCount} />}
      </>
    );
  }

  if (error) {
    content = <p>An error occured</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <Search onSearch={searchHandler} />
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
