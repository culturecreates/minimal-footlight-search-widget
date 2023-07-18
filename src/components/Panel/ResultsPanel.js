import React, { useState } from "react";
import EventsList from "../Events/EventsList";
import SearchFooter from "../Footer/SearchFooter";
import Tabs from "../Tabs/Tabs";
import "./ResultsPanel.css";
import Calender from "../Calendar/Calender";
import NoContent from "../Noresult/NoContent";
import Loader from "../Loader";
import ResultHeading from "./ResultHeading";

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
    searchDate,
    setIsLoading,
  } = props;

  const [showPanel] = useState(true);
  const [isMobileView] = useState(window.screen.width < "650px");

  let content;
  const loadingText =
    widgetProps.locale === "fr" ? <p>TÉLÉCHARGEMENT...</p> : <p>LOADING...</p>;

  if (events.length > 0 && totalCount > 0) {
    content = (
      <div className="content">
        <ResultHeading
          searchDate={searchDate}
          locale={locale}
          isLoading={isLoading}
        />
        <div>
          <EventsList
            tabSelected={tabSelected}
            widgetProps={widgetProps}
            events={events}
          />
        </div>
      </div>
    );
  } else {
    const message =
      locale === "fr"
        ? `Aucun ${tabSelected} disponible`
        : `No ${tabSelected} found `;

    content = (
      <NoContent
        message={message}
        date={searchDate}
        locale={locale}
        isLoading={isLoading}
      />
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
    content = <Loader text={loadingText} />;
  }

  const changeTabHandler = (clickedTab) => {
    onChangeTab(clickedTab);
  };

  return (
    <>
      {showPanel && !isMobileView ? (   // for desktop and tablet view
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
              setIsLoading={setIsLoading}
            />
          </div>
          <SearchFooter
            count={totalCount}
            locale={widgetProps.locale}
            onSubmit={onSubmit}
          />
        </div>
      ) : ( // for mobile view
        <>
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
              setIsLoading={setIsLoading}
            />
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
