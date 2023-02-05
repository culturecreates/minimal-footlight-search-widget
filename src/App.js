import React, { useState, useEffect, useCallback } from "react";
import ResultsPanel from "./components/ResultsPanel";
import "./App.css";

function App(props) {
  const apiEventsUrl = `http://${props.api}/calendars/tout-culture/events?page=1&limit=5`;
  const apiOrganizationsUrl = `http://${props.api}/calendars/tout-culture/organizations?page=1&limit=5`;
  const apiAteliersUrl = `http://${props.api}/calendars/tout-culture/events?type=63e00d658097540065660ef7&page=1&limit=5`;

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [apiUrl, setApiUrl] = useState(apiEventsUrl);
  const [showResults, setShowResults] = useState(false);
  const [searchFieldFocus, setSearchFieldFocus] = useState(false);
  const [mouseOverSearchWidget, setMouseOverSearchWidget] = useState(false);
  const [searchDateFocus, setSearchDateFocus] = useState(false);

  const changeTabHandler = (clickedTab) => {
    if (clickedTab === "Organizations") {
      setApiUrl(apiOrganizationsUrl);
    } else if (clickedTab === "Ateliers") {
      setApiUrl(apiAteliersUrl);
    } else {
      setApiUrl(apiEventsUrl);
    }
  };

  const fetchDataHandler = useCallback(
    async (q, date) => {
      setIsLoading(true);
      setError(false);
      let url = apiUrl;
      if (q) {
        url += `&query=${q}`;
      }
      if (date) {
        url += `&start-date-range=${date}`;
      }
      try {
        console.log("Fetch:" + url);
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
    [apiUrl]
  );

  const submitHandler = (event) => {
    console.log("SUBMIT");
    event.preventDefault();

    const searchParams = new URLSearchParams();
    if (searchString !== "") {
      searchParams.append("query", searchString);
    }
    if (searchDate) {
      searchParams.append("start-date-range", searchDate);
    }
    window.location.href = props.searchUrl + "?" + searchParams.toString();

    //fetchDataHandler(searchString);
  };

  const focusHandler = () => {
    console.log("focusHandler");
    setSearchFieldFocus(true);
    setMouseOverSearchWidget(true);
  };

  const dateFocusHandler = () => {
    console.log("dateFocusHandler");
    setSearchDateFocus(true);
    setMouseOverSearchWidget(true);
  };

  const dateBlurHandler = () => {
    console.log("dateBlurHandler");
    setSearchDateFocus(false);
  };

  const blurHandler = () => {
    console.log("blurHandler");
    setSearchFieldFocus(false);
  };

  const mouseLeaveHandler = () => {
    console.log("mouseLeaveHandler");
    setMouseOverSearchWidget(false);
  };

  const changeHandler = (event) => {
    console.log("changeHandler:" + event);
    setSearchString(event.target.value);
  };

  const changeDateHandler = (event) => {
    console.log("changeDateHandler: " + event.target.value);
    setSearchDate(event.target.value);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("QUERY: " + searchString + "Date:" + searchDate);
      fetchDataHandler(searchString, searchDate);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [searchString, searchDate, fetchDataHandler, apiUrl]);

  useEffect(() => {
    console.log(
      `useEffect searchFieldFocus: ${searchFieldFocus}, showResults:  ${showResults}`
    );
    if (
      searchFieldFocus === false &&
      mouseOverSearchWidget === false &&
      searchDateFocus === false
    ) {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }, [showResults, searchFieldFocus, searchDateFocus, mouseOverSearchWidget]);

  return (
    <div className="footlightSearchWidget" onMouseLeave={mouseLeaveHandler}>
      <form onSubmit={submitHandler} autocomplete="off">
        <input type="submit"></input>
        <input
          type="text"
          placeholder="Recherche"
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
        <input
          type="date"
          onChange={changeDateHandler}
          onFocus={dateFocusHandler}
          onBlur={dateBlurHandler}
        />
      </form>
      {showResults && (
        <ResultsPanel
          error={error}
          events={events}
          isLoading={isLoading}
          totalCount={totalCount}
          eventUrl={props.eventUrl}
          onChangeTab={changeTabHandler}
        />
      )}
    </div>
  );
}

export default App;
