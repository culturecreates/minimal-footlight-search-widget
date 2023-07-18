import React, { useState, useEffect, useCallback, useRef } from "react";
import ResultsPanel from "./components/Panel/ResultsPanel";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import { DateFormatter } from "./components/Date/DateFormatter";

function App(props) {
  // ALL props passed in from HTML widget
  const api = props.api || "api.footlight.io";
  const calendar = props.calendar || "tout-culture";
  const eventUrl =
    props.eventUrl ||
    "http://demo.tout-culture.s3-website.ca-central-1.amazonaws.com/events/event-details.html?eventId=";
  const orgUrl =
    props.orgUrl ||
    "https://toutculture.stagingminimalmtl.com/organismes-detail/?organize=";
  const eventSearchUrl =
    props.searchEventsUrl ||
    "https://toutculture.stagingminimalmtl.com/evenements/";
  const orgSearchUrl =
    props.searchOrgsUrl ||
    "https://toutculture.stagingminimalmtl.com/organismes/";
  const locale = props.locale || "fr";

  // object to pass HTML widget props to children components
  const widgetProps = {
    eventUrl: eventUrl,
    orgUrl: orgUrl,
    eventSearchUrl: eventSearchUrl,
    orgSearchUrl: orgSearchUrl,
    locale: locale,
  };

  // constants built using other constants
  const apiEventsUrl = `https://${api}/calendars/${calendar}/events?page=1&limit=15`;
  const apiOrganizationsUrl = `https://${api}/calendars/${calendar}/organizations?page=1&limit=5&sort=name.fr&concept=63d167da016e830064fbb03b`;
  const apiAteliersUrl = `https://${api}/calendars/${calendar}/events?type=64776b93fbeda20064d2332f&page=1&limit=5`;

  // States
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [searchDate, setSearchDate] = useState();
  const [startDateSpan, setStartDateSpan] = useState("");
  const [endDateSpan, setEndDateSpan] = useState("");
  const [apiUrl, setApiUrl] = useState(apiEventsUrl);
  const [showResults, setShowResults] = useState(false);
  const [searchFieldFocus, setTextFocus] = useState(false);
  const [tabSelected, setTabSelected] = useState("Events");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [panelDisplayControl, setPanelDisplayControl] = useState(true); // controls which component to render in panel for mobile view. false = datepicker

  // Refs
  const textInputRef = useRef(null);
  const refFootlightSearchWidget = useRef(null);
  const refPopover = useRef(null);

  // Handlers
  const changeTabHandler = (clickedTab) => {
    // set focus on text input to keep results panel open
    textInputRef.current.focus();
    setTextFocus(true);
    if (tabSelected !== clickedTab) {
      setIsLoading(true);
    }
    setTabSelected(clickedTab);
    if (clickedTab === "Organizations") {
      setApiUrl(apiOrganizationsUrl);
    } else if (clickedTab === "Ateliers") {
      setApiUrl(apiAteliersUrl);
    } else {
      setApiUrl(apiEventsUrl);
    }
  };

  const fetchDataHandler = useCallback(
    async (q, startDate, endDate) => {
      setIsLoading(true);
      setError(false);
      let url = apiUrl;
      if (q) {
        url += `&query=${q}`;
      }
      if (startDate) {
        url += `&start-date-range=${startDate}`;
      }
      if (endDate) {
        url += `&end-date-range=${endDate}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const transformedEvents = await data.data.map((eventData) => {
          let place = eventData.location || {};
          // If place is an array then extract first object of type 'Place'
          if (Array.isArray(place)) {
            place =
              eventData.location.filter((place) => place.type === "Place")[0] ||
              {};
          }

          return {
            id: eventData.id,
            title: eventData.name.fr || eventData.name.en,
            startDate: eventData.startDate || eventData.startDateTime || "",
            endDate: eventData.endDate || eventData.endDateTime || "",
            image: eventData.image?.thumbnail || "",
            place: place.name?.fr || place.name?.en || "",
            city:
              place.address?.addressLocality?.fr ||
              place.address?.addressLocality?.en ||
              "",
            streetAddress:
              place.address?.streetAddress?.fr ||
              place.address?.streetAddress?.en ||
              "",
          };
        });
        setEvents(transformedEvents);
        setTotalCount(data.meta?.totalCount || 0);
      } catch {
        setError(true);
      }
      setIsLoading(false);
    },
    [apiUrl]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchString !== "") {
      searchParams.append("query", searchString);
    }
    if (startDateSpan) {
      searchParams.append("start-date-range", startDateSpan);
    }
    if (endDateSpan) {
      searchParams.append("end-date-range", endDateSpan);
    }
    let searchUrl = eventSearchUrl;
    if (tabSelected === "Organizations") {
      searchUrl = orgSearchUrl;
    }
    setSearchString(""); // otherwise backbutton will restore results panel but no text will be in search bar.
    let url = searchUrl + "?" + searchParams.toString();
    window.location.href = url;
    console.log("FORM SUBMIT: " + url);
  };

  const textFocusHandler = () => {
    setTextFocus(true);
  };
  const textBlurHandler = () => {
    setTextFocus(false);
  };
  const textChangeHandler = (event) => {
    setSearchString(event.target.value);
  };

  // Effects
  useEffect(() => {
    // debounce search while typing
    const identifier = setTimeout(() => {
      fetchDataHandler(searchString, startDateSpan, endDateSpan);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [searchString, startDateSpan, endDateSpan, fetchDataHandler, apiUrl]);

  useEffect(() => {
    // show results panel
    if (searchFieldFocus === true || isPopoverOpen === true) {
      setShowResults(true);
    }
  }, [showResults, searchFieldFocus, isPopoverOpen]);

  useEffect(() => {
    // click outside to hide -- move to results panel component and popover component
    const handleClickOutside = (event) => {
      if (
        refFootlightSearchWidget.current &&
        !refFootlightSearchWidget.current.contains(event.target)
      ) {
        if (
          (refPopover.current && !refPopover.current.contains(event.target)) ||
          !refPopover.current
        ) {
          setIsPopoverOpen(false);
          setShowResults(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isPopoverOpen, showResults, refFootlightSearchWidget]);

  return (
    <div className="footlightSearchWidget" ref={refFootlightSearchWidget}>
      <div>
        <form onSubmit={submitHandler} autoComplete="off">
          <input type="submit"></input>
          <input
            type="text"
            placeholder={locale === "en" ? "Search" : "Recherche"}
            onChange={textChangeHandler}
            onFocus={textFocusHandler}
            onBlur={textBlurHandler}
            ref={textInputRef}
          />
        </form>
        {tabSelected !== "Organizations" && (
          <div className="topDateDiv">
            <DateFormatter date={searchDate} locale={locale} />
          </div>
        )}
      </div>
      <div className="panel-anchor">
        <div className="panel-float">
          {showResults && (
            <>
              <ResultsPanel
                error={error}
                events={events}
                isLoading={isLoading}
                totalCount={totalCount}
                widgetProps={widgetProps}
                onChangeTab={changeTabHandler}
                tabSelected={tabSelected}
                onSubmit={submitHandler}
                locale={locale}
                setSearchDate={setSearchDate}
                setStartDateSpan={setStartDateSpan}
                setEndDateSpan={setEndDateSpan}
                searchDate={searchDate}
                setIsLoading={setIsLoading}
                panelDisplayControl={panelDisplayControl}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
