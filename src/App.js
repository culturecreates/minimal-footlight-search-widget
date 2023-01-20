import React, { useState, useEffect, useCallback } from "react";
import SearchPanel from "./components/SearchPanel";
import "./App.css";

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
      let url = `https://${props.api}/calendars/tout-culture/events?page=1&limit=5`;
      if (q) {
        url += `&query=${q}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const transformedEvents = await data.data.map((eventData) => {
          const place =
            eventData.location.filter((loc) => loc.type === "Place")[0] || "";
          return {
            id: eventData.id,
            title: eventData.name.fr || eventData.name.en,
            startDate: eventData.startDate || eventData.startDateTime,
            image: eventData.image.thumbnail || "",
            place: place.name?.fr || place.name?.en || "",
            city:
              place.address?.addressLocality?.fr ||
              place.address?.addressLocality?.en ||
              "",
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

  const submitHandler = (event) => {
    event.preventDefault();
    fetchEventsHandler(searchString);
  };
  const focusHandler = () => setShowResults(true);
  const blurHandler = (event) => {
    setTimeout(() => {
      console.log("Blurr timeout");
      setShowResults(false);
    }, 500);
  };
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
    <div className="footlightSearchWidget">
      <div className="searchDiv">
        <form onSubmit={submitHandler}>
          <div className="searchFormInner">
            <input type="submit" id="searchSubmit"></input>
            <input
              type="text"
              id="query"
              placeholder="Recherche"
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
            eventUrl={props.eventUrl}
          />
        )}
      </div>
    </div>
  );
}

export default App;
