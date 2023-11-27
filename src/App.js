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
import { transformData } from "./helpers/transformData";
import { debounce } from "./helpers/debounce";
import { PANELS, SCREENS } from "./constants/screenAndPanelTypes";

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
    locale,
    searchEventsFilter = "exclude-type=64776b93fbeda20064d2332f",
    searchWorkshopFilter = "type=64776b93fbeda20064d2332f",
    searchPanelState = "float",
  } = props;

  // object to pass HTML widget props to children components
  const widgetProps = {
    ...(eventUrl && { eventUrl }),
    ...(orgUrl && { orgUrl }),
    ...(eventSearchUrl && { eventSearchUrl }),
    ...(orgSearchUrl && { orgSearchUrl }),
    locale,
    ...(searchEventsFilter && { searchEventsFilter }),
    ...(searchWorkshopFilter && { searchWorkshopFilter }),
    searchPanelState,
  };

  // constants built using other constants
  const apiEventsUrl = `https://${api}/calendars/${calendar}/events?${searchEventsFilter}&page=1&limit=9`;
  const apiOrganizationsUrl = `https://${api}/calendars/${calendar}/organizations?page=1&limit=10&sort=name.fr&concept=63d167da016e830064fbb03b`;
  const apiAteliersUrl = `https://${api}/calendars/${calendar}/events?${searchWorkshopFilter}&page=1&limit=9`;

  const query = sessionStorage.getItem("widgetSearchQuery");
  const savedStartDate = sessionStorage.getItem("widgetStartDate");
  const savedEndDate = sessionStorage.getItem("widgetEndDate");

  // States
  const [events, setEvents] = useState([]);
  const [workshop, setWorkshops] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCountEvents, setTotalCountEvents] = useState(0);
  const [totalCountWorkshops, setTotalCountWorkshops] = useState(0);
  const [totalCountOrganizations, setTotalCountOrganizations] = useState(0);
  const [searchString, setSearchString] = useState(query ? query : "");
  const [startDateSpan, setStartDateSpan] = useState(savedStartDate);
  const [endDateSpan, setEndDateSpan] = useState(savedEndDate);
  const [apiUrl, setApiUrl] = useState(apiEventsUrl);
  const [showResults, setShowResults] = useState(searchPanelState !== "float");
  const [searchFieldFocus, setTextFocus] = useState(false);
  const [tabSelected, setTabSelected] = useState(Tabs.EVENTS);
  const [panelOnDisplay, setPanelOnDisplay] = useState(PANELS.RESULT); // controls which component to render in panel for mobile view. states = datepicker, results
  const [screenType, setScreenType] = useState();
  const [isSingleDate, setIsSingleDate] = useState(
    sessionStorage.getItem("widgetSearchDate")?.includes(",")
  ); //Array.isArray(date)
  const [searchDate, setSearchDate] = useState(null); //  typeof date === "string" || Array.isArray(date) ? date : null

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
      // setIsLoading(true);
      // set focus on text input to keep results panel open
      textInputRef.current.focus();
      setTextFocus(true);
      setEvents([]);
      setTabSelected(clickedTab);
      if (clickedTab === Tabs.ORGANIZATIONS) {
        setWorkshops([]);
        setEvents([]);
        setApiUrl(apiOrganizationsUrl);
      } else if (clickedTab === Tabs.WORKSHOPS) {
        setEvents([]);
        setOrganizations([]);
        setApiUrl(apiAteliersUrl);
      } else if (clickedTab === Tabs.EVENTS) {
        setWorkshops([]);
        setOrganizations([]);
        setApiUrl(apiEventsUrl);
      }
    }
  };

  const fetchDataHandler = async (q, startDate, endDate, locale) => {
    setIsLoading(true);
    setError(false);
    let url = apiUrl;
    if (q) {
      url += `&query=${q}`;
    }
    if (tabSelected !== Tabs.ORGANIZATIONS) {
      if (startDate) {
        url += `&start-date-range=${startDate}`;
      }
      if (endDate) {
        url += `&end-date-range=${endDate}`; // For single date filter then send end date the same as start date.
      }
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (tabSelected === Tabs.EVENTS) {
        setEvents(transformData({ data, locale, tabSelected }));
        setTotalCountEvents(data.meta?.totalCount || 0);
      } else if (tabSelected === Tabs.WORKSHOPS) {
        setWorkshops(transformData({ data, locale, tabSelected }));
        setTotalCountWorkshops(data.meta?.totalCount || 0);
      } else {
        setOrganizations(transformData({ data, locale, tabSelected }));
        setTotalCountOrganizations(data.meta?.totalCount || 0);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchPlace = useCallback(debounce(fetchDataHandler, 700), [
    apiUrl,
  ]);

  // const searchDateHandler = (value) => {
  //   if (!Array.isArray(value)) {
  //     const selectedDate = dateConverter(new Date(value));
  //     setStartDateSpan(selectedDate);
  //     setEndDateSpan(selectedDate);
  //   } else {
  //     if (value[0] !== null) {
  //       setStartDateSpan(dateConverter(new Date(value[0])));
  //       setEndDateSpan(dateConverter(new Date(value[1])));
  //     } else {
  //       setStartDateSpan("");
  //       setEndDateSpan("");
  //     }
  //   }
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams();

    if (tabSelected !== Tabs.ORGANIZATIONS) {
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

    let searchUrl = eventSearchUrl;

    if (tabSelected === Tabs.ORGANIZATIONS) {
      searchUrl = orgSearchUrl;
      searchParams.append("concept", "63d167da016e830064fbb03b");
    }
    setSearchString(""); // otherwise backbutton will restore results panel but no text will be in search bar.
    let url = searchUrl + "?" + searchParams.toString();

    if (tabSelected === "Ateliers") {
      url = url + "&" + searchWorkshopFilter;
    }
    if (tabSelected === "Events") {
      url = url + "&" + searchEventsFilter;
    }

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
    sessionStorage.setItem("widgetSearchQuery", event.target.value);
    debounceSearchPlace(event.target.value, startDateSpan, endDateSpan, locale);
  };

  const onCloseHandler = () => {
    if (panelOnDisplay === PANELS.RESULT) {
      if (searchPanelState === "float") {
        setShowResults(false);
      }
      setTextFocus(false);
    } else if (panelOnDisplay === PANELS.DATEPICKER) {
      setPanelOnDisplay(PANELS.RESULT);
    }
  };

  const datePickerDisplayHandler = (panel = PANELS.RESULT) => {
    setTextFocus(true);
    setPanelOnDisplay(panel);
  };

  // Effects

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  useEffect(() => {
    if (showResults) {
      setIsLoading(true);
      fetchDataHandler(searchString, startDateSpan, endDateSpan, locale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateSpan, endDateSpan, showResults, apiUrl, locale]);

  useEffect(() => {
    // show results panel
    if (searchPanelState === "float") {
      if (searchFieldFocus) {
        setShowResults(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          if (searchPanelState === "float") {
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
    setScreenType(isWide ? SCREENS.MOBILE : SCREENS.DESKTOP);
    // datePickerDisplayHandler();
  }, [width]);

  useEffect(() => {
    // set view type accoring to screen size
    const monthFormat = "short";
    const yearFormat = "2-digit";
    let text = "";
    if (searchDate && screenType === SCREENS.MOBILE) {
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
        searchWorkshopFilter,
      })
    );
  }, [eventSearchUrl, orgSearchUrl, searchWorkshopFilter]);

  return (
    <div className="footlightSearchWidget" ref={refFootlightSearchWidget}>
      <div className="input-container">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="input-searchbar">
            <div className="search-bar-icon"></div>
            {panelOnDisplay === PANELS.DATEPICKER &&
              screenType === SCREENS.MOBILE &&
              tabSelected !== Tabs.ORGANIZATIONS && (
                <div
                  className="datepicker-icon"
                  onClick={() => {
                    datePickerDisplayHandler(PANELS.RESULT);
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
              value={searchString}
            />
          </div>
          {screenType === SCREENS.MOBILE && (
            <>
              {!(
                panelOnDisplay === PANELS.DATEPICKER &&
                screenType === SCREENS.MOBILE
              ) &&
                tabSelected !== Tabs.ORGANIZATIONS && (
                  <div
                    className="icon-container"
                    onClick={() => {
                      datePickerDisplayHandler(PANELS.DATEPICKER);
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
        {tabSelected !== Tabs.ORGANIZATIONS &&
          screenType !== SCREENS.MOBILE &&
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
                workshop={workshop}
                organizations={organizations}
                isLoading={isLoading}
                totalCountEvents={totalCountEvents}
                totalCountWorkshops={totalCountWorkshops}
                totalCountOrganizations={totalCountOrganizations}
                widgetProps={widgetProps}
                onChangeTab={changeTabHandler}
                tabSelected={tabSelected}
                onSubmit={submitHandler}
                setPanelOnDisplay={setPanelOnDisplay}
                setScreenType={setScreenType}
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
