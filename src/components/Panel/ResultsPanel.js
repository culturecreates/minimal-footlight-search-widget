import React, { useState } from "react";
import EventsList from "../Events/EventsList";
import SearchFooter from "../Footer/SearchFooter";
import Tabs from "../Tabs/Tabs";
import {Tabs as TABS} from "../../constants/tabs"
import "./ResultsPanel.css";
import Calender from "../Calendar/Calender";
import Loader from "../Loader";
import ResultHeading from "./ResultHeading";
import { useTranslation } from "react-i18next";
import { PANELS, SCREENS } from "../../constants/screenAndPanelTypes";

const ResultsPanel = (props) => {
  const {
    setSearchDate,
    setStartDateSpan,
    setEndDateSpan,
    locale,
    workshop,
    organizations,
    tabSelected,
    widgetProps,
    events,
    onChangeTab,
    onSubmit,
    setPanelOnDisplay,
    setScreenType,
    totalCountEvents,
    totalCountWorkshops,
    totalCountOrganizations,
    error,
    isLoading,
    searchDate,
    setIsLoading,
    panelOnDisplay,
    availableTabs,
    screenType,
    setIsSingleDate,
    isSingleDate,
  } = props;

  const [showPanel] = useState(true);

  const { t } = useTranslation();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else {
    content = (
      <div className="content">
        <ResultHeading
          searchDate={searchDate}
          locale={locale}
          isLoading={isLoading}
          tabSelected={tabSelected}
          totalCountEvents={totalCountEvents}
          totalCountWorkshops={totalCountWorkshops}
          totalCountOrganizations={totalCountOrganizations}
        />
        <div>
          <EventsList
            tabSelected={tabSelected}
            widgetProps={widgetProps}
            events={events}
            workshop={workshop}
            organizations={organizations}
            date={searchDate}
            locale={locale}
            searchDate={searchDate}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  if (error) {
    content = <p>{t("error")}</p>;
  }

  const changeTabHandler = (clickedTab) => {
    onChangeTab(clickedTab);
  };

  return (
    <>
      {showPanel && screenType === SCREENS.DESKTOP ? ( // for desktop and tablet view
        <div className="panel-result">
          <Tabs
            onChangeTab={changeTabHandler}
            tabSelected={tabSelected}
            locale={widgetProps.locale}
            availableTabs={availableTabs}
          />
          <div className="panel-content">
            <div className="result-container">{content}</div>

            {tabSelected !== TABS.ORGANIZATIONS && (
              <div className="calendar-container">
                <Calender
                  locale={locale}
                  setSearchDate={setSearchDate}
                  setStartDateSpan={setStartDateSpan}
                  setEndDateSpan={setEndDateSpan}
                  searchDate={searchDate}
                  setPanelOnDisplay={setPanelOnDisplay}
                  setScreenType={setScreenType}
                  setIsLoading={setIsLoading}
                  isSingleDate={isSingleDate}
                  setIsSingleDate={setIsSingleDate}
                />
              </div>
            )}
          </div>
          <SearchFooter
            locale={widgetProps.locale}
            tabSelected={tabSelected}
            isLoading={isLoading}
            onSubmit={onSubmit}
            totalCountEvents={totalCountEvents}
            totalCountWorkshops={totalCountWorkshops}
            totalCountOrganizations={totalCountOrganizations}
          />
        </div>
      ) : (
        // for mobile view
        <>
          <div className="panel-result">
            {panelOnDisplay !== PANELS.DATEPICKER && (
              <Tabs
                onChangeTab={changeTabHandler}
                tabSelected={tabSelected}
                locale={widgetProps.locale}
                availableTabs={availableTabs}
              />
            )}
            <div className="panel-content">
              {panelOnDisplay !== PANELS.DATEPICKER ? (
                content
              ) : tabSelected !== TABS.ORGANIZATIONS ? (
                <Calender
                  locale={locale}
                  setSearchDate={setSearchDate}
                  setStartDateSpan={setStartDateSpan}
                  setEndDateSpan={setEndDateSpan}
                  searchDate={searchDate}
                  setPanelOnDisplay={setPanelOnDisplay}
                  setScreenType={setScreenType}
                  setIsLoading={setIsLoading}
                  screenType={screenType}
                  isSingleDate={isSingleDate}
                  setIsSingleDate={setIsSingleDate}
                />
              ) : (
                <></>
              )}
            </div>
            <SearchFooter
              locale={widgetProps.locale}
              tabSelected={tabSelected}
              isLoading={isLoading}
              onSubmit={onSubmit}
              totalCountEvents={totalCountEvents}
              totalCountWorkshops={totalCountWorkshops}
              totalCountOrganizations={totalCountOrganizations}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ResultsPanel;
