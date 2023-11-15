import React, { useState, useEffect, useCallback, useRef } from "react";
import ResultsPanel from "./components/Panel/ResultsPanel";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import { DateFormatter } from "./components/Date/DateFormatter";
import CalendarIcon from "./assets/icons/Calendar.svg";
import CloseIcon from "./assets/icons/Close.svg";
import { useSize } from "./helpers/hooks";
import { displayDate } from "./helpers/helper";
import { useTranslation } from "react-i18next";
import { Tabs } from "./constants/tabs";
import { getAvailableTabs } from "./helpers/getAvailableTabs";

function App(props) {
  // ALL props passed in from HTML widget

  const { t, i18n } = useTranslation();

  // const api = props.api || "api.footlight.io";
  // const calendar = props.calendar || "tout-culture";
  // const eventUrl = props.eventUrl;
  // // ||"http://demo.tout-culture.s3-website.ca-central-1.amazonaws.com/events/event-details.html?eventId=";
  // const orgUrl = props.orgUrl;
  // // ||"https://toutculture.stagingminimalmtl.com/organismes-detail/?organize=";
  // const eventSearchUrl = props.searchEventsUrl;
  // // ||"https://toutculture.stagingminimalmtl.com/evenements/";
  // const orgSearchUrl = props.searchOrgsUrl;
  // // ||"https://toutculture.stagingminimalmtl.com/organismes/";
  // const locale = props.locale || "fr";

  const {
    api = "api.footlight.io",
    calendar = "tout-culture",
    eventUrl,
    orgUrl,
    searchEventsUrl: eventSearchUrl,
    searchOrgsUrl: orgSearchUrl,
    locale = "fr",
    searchEventsFilter = "type=64776b93fbeda20064d2332f",
    searchPanelState,
  } = props;

  // object to pass HTML widget props to children components
  const widgetProps = {
    ...(eventUrl && { eventUrl }),
    ...(orgUrl && { orgUrl }),
    ...(eventSearchUrl && { eventSearchUrl }),
    ...(orgSearchUrl && { orgSearchUrl }),
    locale,
    ...(searchEventsFilter && { searchEventsFilter }),
    searchPanelState,
  };

  // constants built using other constants
  const apiEventsUrl = `https://${api}/calendars/${calendar}/events?exclude-type=64776b93fbeda20064d2332f&page=1&limit=10`;
  const apiOrganizationsUrl = `https://${api}/calendars/${calendar}/organizations?page=1&limit=10&sort=name.fr&concept=63d167da016e830064fbb03b`;
  const apiAteliersUrl = `https://${api}/calendars/${calendar}/events?type=64776b93fbeda20064d2332f&page=1&limit=10`;

  // States
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [startDateSpan, setStartDateSpan] = useState("");
  const [endDateSpan, setEndDateSpan] = useState("");
  const [apiUrl, setApiUrl] = useState(apiEventsUrl);
  const [showResults, setShowResults] = useState(searchPanelState === "float");
  const [searchFieldFocus, setTextFocus] = useState(false);
  const [tabSelected, setTabSelected] = useState("Events");
  const [panelOnDisplay, setPanelOnDisplay] = useState("result"); // controls which component to render in panel for mobile view. states = datepicker, results
  const [screenType, setScreenType] = useState();
  const [isSingleDate, setIsSingleDate] = useState(false);
  const [searchDate, setSearchDate] = useState(null);
  const [placeHolderText, setPlaceHoldertext] = useState(t("placeHolder"));
  const [availableTabs, setAvailableTabs] = useState([]);

  // Refs
  const textInputRef = useRef(null);
  const refFootlightSearchWidget = useRef(null);
  const refPopover = useRef(null);

  // value hooks
  const width = useSize();

  // Handlers
  const changeTabHandler = (clickedTab) => {
    if (tabSelected !== clickedTab) {
      setIsLoading(true);
      // set focus on text input to keep results panel open
      textInputRef.current.focus();
      setTextFocus(true);
      setEvents([]);
      setTabSelected(clickedTab);
      if (clickedTab === Tabs.ORGANIZATIONS) {
        setApiUrl(apiOrganizationsUrl);
      } else if (clickedTab === Tabs.WORKSHOPS) {
        setApiUrl(apiAteliersUrl);
      } else if (clickedTab === Tabs.EVENTS) {
        setApiUrl(apiEventsUrl);
      }
    }
  };

  const fetchDataHandler = useCallback(
    async (q, startDate, endDate, locale, signal) => {
      setPanelOnDisplay("result");
      setIsLoading(true);
      setError(false);
      let url = apiUrl;
      if (q) {
        url += `&query=${q}`;
      }
      if (tabSelected !== "Organizations") {
        if (startDate) {
          url += `&start-date-range=${startDate}`;
        }
        if (endDate) {
          url += `&end-date-range=${endDate}`; // For single date filter then send end date the same as start date.
        }
      }

      try {
        const response = await fetch(url, { signal });
        const data = await response.json();

        const transformedEvents = await data.data.map((eventData) => {
          let place = eventData.location || {};
          // If place is an array then extract first object of type 'Place'
          if (Array.isArray(place)) {
            place =
              eventData.location.filter((place) => place.type === "Place")[0] ||
              {};
          }

          // Fallback to English and then French if the locale-specific name is not available
          const title =
            eventData.name?.[locale] ||
            eventData.name?.en ||
            eventData.name?.fr ||
            "";

          const addressLocality =
            place.address?.addressLocality?.[locale] ||
            place.address?.addressLocality?.en ||
            place.address?.addressLocality?.fr ||
            "";

          const streetAddress =
            place.address?.streetAddress?.[locale] ||
            place.address?.streetAddress?.en ||
            place.address?.streetAddress?.fr ||
            "";

          return {
            id: eventData.id,
            title: title,
            ...(tabSelected !== "Organizations"
              ? {
                  startDate:
                    eventData.subEventDetails.upcomingSubEventCount === 0
                      ? eventData?.startDate || eventData?.startDateTime || ""
                      : eventData.subEventDetails
                          ?.nextUpcomingSubEventDateTime ||
                        eventData.subEventDetails?.nextUpcomingSubEventDate ||
                        "",
                  endDate: eventData.endDate || eventData.endDateTime || "",
                }
              : {}),
            image: eventData.image?.thumbnail || "",
            place:
              place.name?.[locale] || place.name?.en || place.name?.fr || "",
            city: addressLocality,
            streetAddress: streetAddress,
          };
        });

        setEvents(transformedEvents);
        setTotalCount(data.meta?.totalCount || 0);
      } catch {
        if (!signal.aborted) {
          setError(true);
        }
      }
      setIsLoading(false);
    },
    [apiUrl, tabSelected]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams();

    if (tabSelected !== "Organizations") {
      searchParams.append("limit", 100);
    }
    if (searchString !== "") {
      searchParams.append("query", searchString);
    }
    if (startDateSpan) {
      searchParams.append("start-date-range", startDateSpan);
    }
    if (endDateSpan) {
      searchParams.append("end-date-range", endDateSpan);
    }
    if (tabSelected === "Ateliers") {
      searchParams.append("type", "64776b93fbeda20064d2332f");
    }
    if (tabSelected === "Events") {
      searchParams.append("exclude-type", "64776b93fbeda20064d2332f");
    }
    let searchUrl = eventSearchUrl;
    if (tabSelected === "Organizations") {
      searchUrl = orgSearchUrl;
      searchParams.append("concept", "63d167da016e830064fbb03b");
    }
    setSearchString(""); // otherwise backbutton will restore results panel but no text will be in search bar.
    let url = searchUrl + "?" + searchParams.toString();
    window.open(url, "_blank");
  };

  const textFocusHandler = () => {
    setTextFocus(true);
    setPlaceHoldertext("");
  };
  const textBlurHandler = () => {
    setTextFocus(false);
    setPlaceHoldertext(t("placeHolder"));
  };
  const textChangeHandler = (event) => {
    setSearchString(event.target.value);
  };

  const onCloseHandler = () => {
    if (panelOnDisplay === "result") {
      if (searchPanelState !== "float") {
        setShowResults(false);
      }
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
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  useEffect(() => {
    // debounce search while typing
    const abortController = new AbortController();
    const signal = abortController.signal;
    setIsLoading(true);

    const identifier = setTimeout(() => {
      fetchDataHandler(
        searchString,
        startDateSpan,
        endDateSpan,
        locale,
        signal
      );
    }, 700);
    return () => {
      clearTimeout(identifier);
      abortController.abort();
    };
  }, [
    searchString,
    startDateSpan,
    endDateSpan,
    fetchDataHandler,
    apiUrl,
    locale,
    searchDate,
  ]);

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
          if (searchPanelState !== "float") {
            setShowResults(false);
          }
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showResults, refFootlightSearchWidget, searchPanelState]);

  useEffect(() => {
    // set view type accoring to screen size
    const isWide = width < 768;
    setScreenType(isWide ? "mobile" : "desktop");
  }, [width]);

  useEffect(() => {
    // set view type accoring to screen size
    const monthFormat = "short";
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
  }, [locale, screenType, searchDate, isLoading, isSingleDate]);

  useEffect(() => {
    setSearchDate(null);
  }, [isSingleDate]);

  useEffect(() => {
    setAvailableTabs(
      getAvailableTabs({
        eventSearchUrl,
        orgSearchUrl,
        searchEventsFilter,
      })
    );
  }, [eventSearchUrl, orgSearchUrl, searchEventsFilter]);

  return (
    <div className="footlightSearchWidget" ref={refFootlightSearchWidget}>
      <div className="input-container">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="input-searchbar">
            <div className="search-bar-icon"></div>
            {panelOnDisplay === "datepicker" &&
              screenType === "mobile" &&
              tabSelected !== "Organizations" && (
                <div
                  className="datepicker-icon"
                  onClick={() => {
                    datePickerDisplayHandler("result");
                  }}
                ></div>
              )}
            <input
              className="search-textfield"
              type="text"
              size={1}
              placeholder={placeHolderText}
              onChange={textChangeHandler}
              onFocus={textFocusHandler}
              onBlur={textBlurHandler}
              ref={textInputRef}
            />
          </div>
          {screenType === "mobile" && (
            <>
              {!(panelOnDisplay === "datepicker" && screenType === "mobile") &&
                tabSelected !== "Organizations" && (
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
        {tabSelected !== "Organizations" &&
          screenType !== "mobile" &&
          showResults && (
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
                availableTabs={availableTabs}
                setSearchDate={setSearchDate}
                setStartDateSpan={setStartDateSpan}
                setEndDateSpan={setEndDateSpan}
                searchDate={searchDate}
                setIsLoading={setIsLoading}
                panelOnDisplay={panelOnDisplay}
                screenType={screenType}
                setIsSingleDate={setIsSingleDate}
                isSingleDate={isSingleDate}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
