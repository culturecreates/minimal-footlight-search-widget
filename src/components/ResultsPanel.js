import React, { useState} from "react";
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
        <EventsList eventUrl={props.eventUrl} events={props.events} />
        <SearchFooter count={props.totalCount} />
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
      <div className="panel-float" onMouseLeave={props.onHideResults}>
        <Tabs onChangeTab={changeTabHandler} />
        {content}
      </div> )
      }
    </div>
  );
};

export default ResultsPanel;
