import React, { useState } from "react";
import EventsList from "./EventsList";
import SearchFooter from "./SearchFooter";
import Tabs from "./Tabs";
import "./ResultsPanel.css";

const ResultsPanel = (props) => {
  const [showPanel] = useState(true);

  let content = <p>Pas de resultats</p>;
  if (props.events.length > -1) {
    content = (
      <>
        <EventsList eventUrl={props.widgetProps.eventUrl || ""} events={props.events}  locale={props.widgetProps.locale}/>
        <SearchFooter count={props.totalCount} onSubmit={props.onSubmit}/>
      </>
    );
  }

  if (props.error) {
    content = <p>An error occured</p>;
  }

  // if (props.isLoading) {
  //   content = <p>Loading...</p>;
  // }

  const changeTabHandler = (clickedTab) => {
    props.onChangeTab(clickedTab);
  };

  return (
    <div className="panel-anchor">
      {showPanel && (
        <div className="panel-float">
          <Tabs
            onChangeTab={changeTabHandler}
            tabSelected={props.tabSelected}
            locale={props.widgetProps.locale}
          />
          {content}
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
