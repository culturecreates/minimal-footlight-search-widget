import React, { useState, useEffect, useCallback } from "react";
import SearchPanel from "./components/SearchPanel";
import classes from "./App.module.css";

function App(props) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [searchString, setSearchString] = useState("");

  const fetchEventsHandler = useCallback(
    async (q) => {
      setIsLoading(true);
      setError(false);
      let url = `https://${props.api}/calendars/tout-culture/events?page=1&limit=1000`;
      if (q) {
        url += `&query=${q}`;
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
      } catch {
        setError(true);
      }
      setIsLoading(false);
    },
    [props.api]
  );

  useEffect(() => {
    fetchEventsHandler();
  }, [fetchEventsHandler]);

  function submitHandler(event) {
    event.preventDefault();
    fetchEventsHandler(searchString);
  }

  const focusHandler = () => setShowResults(true);
  const blurHandler = () => setShowResults(false);

  const changeHandler = (event) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("QUERY");
      fetchEventsHandler(searchString);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [searchString, fetchEventsHandler]);

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="query">Search</label>
          <input
            type="text"
            id="query"
            onChange={changeHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
          />
        </div>
      </form>
      {showResults && (
        <SearchPanel
          error={error}
          events={events}
          isLoading={isLoading}
          totalCount={totalCount}
        />
      )}
    </section>
  );
}

export default App;
