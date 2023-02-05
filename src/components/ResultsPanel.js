import React, { useState, useEffect } from "react";
import EventsList from "./EventsList";
import SearchFooter from "./SearchFooter";
import Tabs from "./Tabs";
import "./ResultsPanel.css";

const ResultsPanel = (props) => {
  const [showPanel] = useState(true);

  useEffect(() => {
    console.log("ResultsPanel useEffect: " + showPanel);
    // if (props.showResults === true) {
    //   setShowPanel(true);
    // }
   
  }, [props.showResults,showPanel]);

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

  const hidePanelHandler = (event) => {
    // setTimeout(() => {
    //   console.log("hidePanelHandler timeout");
    //   setShowPanel(false);
    // }, 500);
  };

  return (
    <div className="panel-anchor">
      {showPanel && (
      <div className="panel-float" onMouseLeave={hidePanelHandler}>
        <Tabs onChangeTab={changeTabHandler} />
        {content}
      </div> )
      }
    </div>
  );
};

export default ResultsPanel;
