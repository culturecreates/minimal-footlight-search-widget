import React, { useState, useEffect, useCallback, useRef } from "react";
import ResultsPanel from "./components/Panel/ResultsPanel";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import { DateFormatter } from "./components/Date/DateFormatter";
import CalendarIcon from "./assets/icons/Calendar.svg";
import CloseIcon from "./assets/icons/Close.svg";
import { useSize } from "./helpers/hooks";
import { displayDate } from "./helpers/helper";

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
  const [panelOnDisplay, setPanelOnDisplay] = useState("result"); // controls which component to render in panel for mobile view. states = datepicker, results
  const [screenType, setScreenType] = useState();
  const [placeHolderText, setPlaceHoldertext] = useState(
    locale === "en" ? "Search" : "Recherche"
  );

  // Refs
  const textInputRef = useRef(null);
  const refFootlightSearchWidget = useRef(null);
  const refPopover = useRef(null);

  // value hooks
  const width = useSize();

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
      setPanelOnDisplay("result");
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
    setPlaceHoldertext("");
  };
  const textBlurHandler = () => {
    setTextFocus(false);
    setPlaceHoldertext(locale === "en" ? "Search" : "Recherche");
  };
  const textChangeHandler = (event) => {
    setSearchString(event.target.value);
  };

  const onCloseHandler = () => {
    if (panelOnDisplay === "result") {
      setShowResults(false);
      setTextFocus(false);
    } else if (panelOnDisplay === "datepicker") {
      setPanelOnDisplay("result");
    }
  };

  const datePickerDisplayHandler = (panel = "result") => {
    setTextFocus(true);
    setPanelOnDisplay(panel);
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
    if (searchFieldFocus === true) {
      setShowResults(true);
    }
  }, [showResults, searchFieldFocus]);

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
          setShowResults(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showResults, refFootlightSearchWidget]);

  useEffect(() => {
    // set viw type accoring to screen size
    const isWide = width < 650;
    setScreenType(isWide ? "mobile" : "desktop");
  }, [width]);

  useEffect(() => {
    // set viw type accoring to screen size
    const monthFormat = "2-digit";
    const yearFormat = "2-digit";
    let text = "";
    if (searchDate && screenType === "mobile") {
      if (Array.isArray(searchDate)) {
        // for date range selection
        const dateArray = searchDate.map((dateItem) => {
          return displayDate(dateItem, locale, monthFormat, yearFormat);
        });
        text = dateArray.join(" - ");
      } else {
        text = displayDate(searchDate, locale, monthFormat, yearFormat);
      }
    }
    setPlaceHoldertext(text);
  }, [locale, screenType, searchDate,isLoading]);

  return (
    <div className="footlightSearchWidget" ref={refFootlightSearchWidget}>
      <div className="input-container">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="input-searchbar">
            <input type="submit"></input>
            {panelOnDisplay === "datepicker" && screenType === "mobile" && (
              <input
                type="datepicker-icon"
                onClick={() => {
                  datePickerDisplayHandler("result");
                }}
              ></input>
            )}
            <input
              type="text"
              placeholder={placeHolderText}
              onChange={textChangeHandler}
              onFocus={textFocusHandler}
              onBlur={textBlurHandler}
              ref={textInputRef}
            />
          </div>
          {screenType === "mobile" && (
            <>
              {!(
                panelOnDisplay === "datepicker" && screenType === "mobile"
              ) && (
                <div
                  className="icon-container"
                  onClick={() => {
                    datePickerDisplayHandler("datepicker");
                  }}
                >
                  <img src={CalendarIcon} alt="calendar"></img>
                </div>
              )}
              <div
                className="icon-container"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  onCloseHandler();
                }}
              >
                <img src={CloseIcon} alt="calendar"></img>
              </div>
            </>
          )}
        </form>
        {tabSelected !== "Organizations" && screenType !== "mobile" && (
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
                panelOnDisplay={panelOnDisplay}
                screenType={screenType}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
