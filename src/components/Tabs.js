import React, { useState } from "react";
import "./Tabs.css";

const Tabs = (props) => {
  const [tabSelected, setTabSelected] = useState("Events");

  const clickEventsTabHandler = () => {
    setTabSelected("Events");
    props.onChangeTab("Events");
  };
  const clickAteliersTabHandler = () => {
    setTabSelected("Ateliers");
    props.onChangeTab("Ateliers");
  };
  const clickOrganizationsTabHandler = () => {
    setTabSelected("Organizations");
    props.onChangeTab("Organizations");
  };

  return (
    <ul className="tabs-list">
      <li
        onClick={clickEventsTabHandler}
        className={tabSelected === "Events" ? "selected" : undefined}
      >
        Événements
      </li>
      <li
        onClick={clickAteliersTabHandler}
        className={tabSelected === "Ateliers" ? "selected" : undefined}
      >
        Ateliers
      </li>
      <li
        onClick={clickOrganizationsTabHandler}
        className={tabSelected === "Organizations" ? "selected" : undefined}
      >
        Organisations
      </li>
    </ul>
  );
};

export default Tabs;
