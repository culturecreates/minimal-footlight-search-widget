import React, { useState } from "react";
import EventsList from "./EventsList";
import SearchFooter from "./SearchFooter";
import Tabs from "./Tabs";
import "./ResultsPanel.css";

const ResultsPanel = (props) => {
  const [showPanel] = useState(true);

  let content;

  if (props.events.length > -1) {
    content = (
      <>
        <EventsList  tabSelected={props.tabSelected} widgetProps={props.widgetProps} events={props.events} />
        <SearchFooter count={props.totalCount}  locale={props.widgetProps.locale} onSubmit={props.onSubmit}/>
      </>
    );
  }

  if (props.error) {
      content = props.widgetProps.locale === "fr" ? <p>Une erreur est survenue.</p> : <p>An error occured.</p>;
  }

  if (props.isLoading) {
      content = props.widgetProps.locale === "fr" ? <p>TÉLÉCHARGEMENT...</p> : <p>LOADING...</p> ;
  }

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
