import React, { useState, useEffect, useCallback, useRef } from "react";
import ResultsPanel from "./components/ResultsPanel";
import Calendar from "react-calendar";
import { Popover } from "react-tiny-popover";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import calendarIcon from "./assets/icons/Calendar.svg";
import moment from "moment/moment";

function App(props) {
  // temporary defaults
  let searchUrl = "https://toutculture.stagingminimalmtl.com/evenements/";
  let calendar = "tout-culture";
  let locale = "fr";

  if (props.calendar) {
    calendar = props.calendarId;
  }
  if (props.searchUrl) {
    searchUrl = props.searchUrl;
  }
  if (props.locale) {
    locale = props.locale;
  }

  // constants built using other constants
  const apiEventsUrl = `https://${props.api}/calendars/${calendar}/events?page=1&limit=5`;
  const apiOrganizationsUrl = `https://${props.api}/calendars/${calendar}/organizations?page=1&limit=5`;
  const apiAteliersUrl = `https://${props.api}/calendars/${calendar}/events?type=63e00d658097540065660ef7&page=1&limit=5`;

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [searchDate, setSearchDate] = useState();
  const [apiUrl, setApiUrl] = useState(apiEventsUrl);
  const [showResults, setShowResults] = useState(false);
  const [searchFieldFocus, setTextFocus] = useState(false);
  const [mouseOverSearchWidget, setMouseOverSearchWidget] = useState(false);
  const [searchDateFocus, setDateFocus] = useState(false);
  const [tabSelected, setTabSelected] = useState("Events");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSingleRange, setIsSingleDate] = useState(false);

  const textInputRef = useRef(null);

  const changeTabHandler = (clickedTab) => {
    // set focus on text input to keep results panel open
    textInputRef.current.focus();
    setTextFocus(true);
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
    async (q, date) => {
      setIsLoading(true);
      setError(false);
      let url = apiUrl;
      if (q) {
        url += `&query=${q}`;
      }
      console.log(moment(date).format("YYYY-MM-DD"));

      if (date) {
        if (date[0] || date) {
          let startDate = moment(date[0] ?? date).format("YYYY-MM-DD");
          url += `&start-date-range=${startDate}`;
        }
        if (date[1]) {
          let endDate = moment(date[1]).format("YYYY-MM-DD");
          url += `&end-date-range=${endDate}`;
        }
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
            startDate:
              eventData.subEventDetails?.nextUpcomingSubEventDate ||
              eventData.subEventDetails?.nextUpcomingSubEventDateTime ||
              eventData.startDate ||
              eventData.startDateTime ||
              "",
            endDate: eventData.endDate || eventData.endDateTime || "",
            image:
              eventData.image?.thumbnail || eventData.logo?.thumbnail || "",
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
    if (searchDate) {
      searchParams.append("start-date-range", searchDate);
    }
    const url = searchUrl + "?" + searchParams.toString();
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
  // const dateFocusHandler = () => {
  //   setDateFocus(true);
  // };
  // const dateBlurHandler = () => {
  //   setDateFocus(false);
  // };
  // const dateChangeHandler = (event) => {
  //   setSearchDate(event.target.value);
  // };
  const mouseLeaveHandler = () => {
    setMouseOverSearchWidget(false);
  };
  const mouseEnterHandler = () => {
    setMouseOverSearchWidget(true);
  };

  // debounce search while typing
  useEffect(() => {
    const identifier = setTimeout(() => {
      fetchDataHandler(searchString, searchDate);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [searchString, searchDate, fetchDataHandler, apiUrl]);

  // show or hide results panel
  useEffect(() => {
    if (
      searchFieldFocus === false &&
      mouseOverSearchWidget === false &&
      searchDateFocus === false
    ) {
      setShowResults(false);
    } else if (
      (searchFieldFocus === true || searchDateFocus === true) &&
      mouseOverSearchWidget === true
    ) {
      setShowResults(true);
    }
  }, [showResults, searchFieldFocus, searchDateFocus, mouseOverSearchWidget]);

  return (
    <div
      className="footlightSearchWidget"
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
    >
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
          {/* <input
          type="date"
          onChange={dateChangeHandler}
          onFocus={dateFocusHandler}
          onBlur={dateBlurHandler}
        /> */}
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>
            {(searchDate || searchDate?.length > 0) && (
              <>
                {moment(
                  searchDate?.length > 0 ? searchDate[0] : searchDate
                ).format("DD MMM YY")}
                &nbsp;
                {searchDate?.length > 0 && <>-&nbsp;</>}
                {searchDate?.length > 0 &&
                  moment(searchDate[1]).format("DD MMM YY")}
              </>
            )}
          </span>
          <Popover
            isOpen={isPopoverOpen}
            id="react-calendar-checkbox-container"
            clickOutsideCapture={true}
            onClickOutside={(e) => console.log(e)}
            align="end"
            positions={["bottom"]} // preferred positions by priority
            content={
              <div
                style={{
                  background: "#ffffff",
                  boxShadow: " 0px 19px 20px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Calendar
                  onChange={(value) => {
                    setSearchDate(value);
                    setIsPopoverOpen(!isPopoverOpen);
                    setDateFocus(true);
                    setMouseOverSearchWidget(true);
                  }}
                  value={searchDate}
                  selectRange={!isSingleRange}
                  className="react-calendar-wrapper"
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
                <img src={calendarIcon} alt="icon date picker" style={{width: "30px", height: "30px"}}/>
              </span>
            </div>
          </Popover>
        </div>
      </div>
      {showResults && (
        <ResultsPanel
          error={error}
          events={events}
          isLoading={isLoading}
          totalCount={totalCount}
          eventUrl={props.eventUrl}
          onChangeTab={changeTabHandler}
          tabSelected={tabSelected}
          locale={locale}
        />
      )}
    </div>
  );
}

export default App;
