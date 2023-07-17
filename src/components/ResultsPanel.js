import React, { useState } from "react";
import EventsList from "./EventsList";
import SearchFooter from "./SearchFooter";
import Tabs from "./Tabs";
import "./ResultsPanel.css";
import Calender from "./Calender";
import NoContent from "./NoContent";
import Loader from "./Loader";

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

  let content;
  const loadingText =
    widgetProps.locale === "fr" ? <p>TÉLÉCHARGEMENT...</p> : <p>LOADING...</p>;

  if (events.length > 0 && totalCount > 0) {
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
  } else {
    const message =
      locale === "fr"
        ? `Aucun ${tabSelected} disponible`
        : `No ${tabSelected} found `;
    const date =
      locale === "fr" && tabSelected !== "Organisations"
        ? `${searchDate}`
        : `${searchDate}`;

    content = (
      <NoContent
        message={message}
        date={date}
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
              setIsLoading={setIsLoading}
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
