import React, { useState } from "react";
import EventsList from "../Events/EventsList";
import SearchFooter from "../Footer/SearchFooter";
import Tabs from "../Tabs/Tabs";
import "./ResultsPanel.css";
import Calender from "../Calendar/Calender";
import NoContent from "../Noresult/NoContent";
import Loader from "../Loader";
import ResultHeading from "./ResultHeading";
import { useTranslation } from "react-i18next";

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
    totalCount,
    onChangeTab,
    onSubmit,
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
  } else if (
    (events.length > 0 || workshop.length > 0 || organizations.length > 0) &&
    totalCount > 0
  ) {
    content = (
      <div className="content">
        <ResultHeading
          searchDate={searchDate}
          locale={locale}
          isLoading={isLoading}
          tabSelected={tabSelected}
        />
        <div>
          <EventsList
            tabSelected={tabSelected}
            widgetProps={widgetProps}
            events={events}
            workshop={workshop}
            organizations={organizations}
          />
        </div>
      </div>
    );
  } else {
    const message = t(`noResult.${tabSelected}`);

    content = (
      <NoContent
        message={message}
        date={searchDate}
        locale={locale}
        isLoading={isLoading}
        tabSelected={tabSelected}
      />
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
      {showPanel && screenType === "desktop" ? ( // for desktop and tablet view
        <div className="panel-result">
          <Tabs
            onChangeTab={changeTabHandler}
            tabSelected={tabSelected}
            locale={widgetProps.locale}
            availableTabs={availableTabs}
          />
          <div className="panel-content">
            <div className="result-container">{content}</div>

            {tabSelected !== "Organizations" && (
              <div className="calendar-container">
                <Calender
                  locale={locale}
                  setSearchDate={setSearchDate}
                  setStartDateSpan={setStartDateSpan}
                  setEndDateSpan={setEndDateSpan}
                  searchDate={searchDate}
                  setIsLoading={setIsLoading}
                  isSingleDate={isSingleDate}
                  setIsSingleDate={setIsSingleDate}
                />
              </div>
            )}
          </div>
          <SearchFooter
            count={totalCount}
            locale={widgetProps.locale}
            onSubmit={onSubmit}
          />
        </div>
      ) : (
        // for mobile view
        <>
          <div className="panel-result">
            {panelOnDisplay !== "datepicker" && (
              <Tabs
                onChangeTab={changeTabHandler}
                tabSelected={tabSelected}
                locale={widgetProps.locale}
                availableTabs={availableTabs}
              />
            )}
            <div className="panel-content">
              {panelOnDisplay !== "datepicker" ? (
                content
              ) : tabSelected !== "Organizations" ? (
                <Calender
                  locale={locale}
                  setSearchDate={setSearchDate}
                  setStartDateSpan={setStartDateSpan}
                  setEndDateSpan={setEndDateSpan}
                  searchDate={searchDate}
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
              count={totalCount}
              locale={widgetProps.locale}
              onSubmit={onSubmit}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ResultsPanel;
