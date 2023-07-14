import React, { useState } from "react";
import EventsList from "./EventsList";
import SearchFooter from "./SearchFooter";
import Tabs from "./Tabs";
import "./ResultsPanel.css";
import Calender from "./Calender";

const ResultsPanel = (props) => {
  const {
    setSearchDate,
    setStartDateSpan,
    setEndDateSpan,
    locale,
    tabSelected,
    widgetProps,
    events,
    totalCount,
    onChangeTab,
    onSubmit,
    error,
    isLoading,
    searchDate
  } = props;

  const [showPanel] = useState(true);

  let content;

  if (events.length > -1) {
    content = (
      <div className="content">
        <div>
          <EventsList
            tabSelected={tabSelected}
            widgetProps={widgetProps}
            events={events}
          />
        </div>
      </div>
    );
  }

  if (error) {
    content =
      widgetProps.locale === "fr" ? (
        <p>Une erreur est survenue.</p>
      ) : (
        <p>An error occured.</p>
      );
  }

  if (isLoading) {
    content =
      widgetProps.locale === "fr" ? (
        <p>TÉLÉCHARGEMENT...</p>
      ) : (
        <p>LOADING...</p>
      );
  }

  const changeTabHandler = (clickedTab) => {
    onChangeTab(clickedTab);
  };

  return (
    <>
      {showPanel && (
        <div className="panel-result">
          <Tabs
            onChangeTab={changeTabHandler}
            tabSelected={tabSelected}
            locale={widgetProps.locale}
          />
          <div className="panel-content">
            {content}
            <Calender
              locale={locale}
              setSearchDate={setSearchDate}
              setStartDateSpan={setStartDateSpan}
              setEndDateSpan={setEndDateSpan}
              searchDate={searchDate}
            />
          </div>
          <SearchFooter
            count={totalCount}
            locale={widgetProps.locale}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </>
  );
};

export default ResultsPanel;
