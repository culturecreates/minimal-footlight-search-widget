import React, { useState, useEffect, useCallback, useRef } from "react";
import ResultsPanel from "./components/ResultsPanel";
import Calendar from "react-calendar";
import { Popover } from "react-tiny-popover";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import calendarIcon from "./assets/icons/Calendar.svg";
import moment from "moment/moment";
import DisplayDate from "./components/DisplayDate";

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
  const apiEventsUrl = `https://${api}/calendars/${calendar}/events?page=1&limit=5`;
  const apiOrganizationsUrl = `https://${api}/calendars/${calendar}/organizations?page=1&limit=5&sort=name.fr&concept=63d1676b016e830064fbafe1&63d167da016e830064fbb03b`;
  const apiAteliersUrl = `https://${api}/calendars/${calendar}/events?type=63e00d658097540065660ef7&page=1&limit=5`;

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
  const [isSingleRange, setIsSingleDate] = useState(false);

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

  const searchDateHandler = (value) => {
    setSearchDate(value);
    setStartDateSpan(moment(value[0] ?? value).format("YYYY-MM-DD"));
    if (value[0]) {
      setEndDateSpan(moment(value[1]).format("YYYY-MM-DD"));
    } else {
      setEndDateSpan(null);
    }
    setIsPopoverOpen(!isPopoverOpen);
    textInputRef.current.focus();
    setTextFocus(true);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #000000",
        }}
      >
        <form onSubmit={submitHandler} autoComplete="off">
          <input type="submit"></input>
          <input
            type="text"
            placeholder="Recherche"
            onChange={textChangeHandler}
            onFocus={textFocusHandler}
            onBlur={textBlurHandler}
            ref={textInputRef}
          />
        </form>
        {tabSelected !== "Organizations" && (
          <div
            className="topDateDiv"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <span
              style={{ whiteSpace: "nowrap" }}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              {(searchDate || searchDate?.length > 0) && (
                <>
                  <DisplayDate date={startDateSpan} />
                  &nbsp;
                  {searchDate?.length > 0 && <>-&nbsp;</>}
                  {searchDate?.length > 0 && <DisplayDate date={endDateSpan} />}
                </>
              )}
            </span>
            <Popover
              isOpen={isPopoverOpen}
              // onClickOutside={() => setIsPopoverOpen(false)}
              id="react-calendar-checkbox-container"
              align="end"
              positions={["bottom"]} // preferred positions by priority
              content={
                <div
                  ref={refPopover}
                  style={{
                    background: "#ffffff",
                    boxShadow: " 0px 19px 20px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Calendar
                    onChange={searchDateHandler}
                    value={searchDate}
                    selectRange={!isSingleRange}
                    className="react-calendar-wrapper"
                    locale={locale}
                  />
                  <div
                    style={{
                      height: "48px",
                      width: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      paddingLeft: "12px",
                      background: "rgba(255, 246, 73, 0.16)",
                      borderTop: "1px solid #545454",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ height: "24px", width: "24px" }}
                      checked={isSingleRange}
                      onChange={(e) => setIsSingleDate(e.target.checked)}
                    />
                    <label>Rechercher à une date précise</label>
                  </div>
                </div>
              }
            >
              <div
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                id="calendar-icon-id"
              >
                <span style={{ cursor: "pointer" }}>
                  <img
                    src={calendarIcon}
                    alt="icon date picker"
                    style={{ width: "25px", height: "25px" }}
                  />
                </span>
              </div>
            </Popover>
          </div>
        )}
      </div>
      {showResults && (
        <ResultsPanel
          error={error}
          events={events}
          isLoading={isLoading}
          totalCount={totalCount}
          widgetProps={widgetProps}
          onChangeTab={changeTabHandler}
          tabSelected={tabSelected}
          onSubmit={submitHandler}
        />
      )}
    </div>
  );
}

export default App;
