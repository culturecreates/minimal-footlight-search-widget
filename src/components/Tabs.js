import "./Tabs.css";

const Tabs = (props) => {
  const clickEventsTabHandler = () => {
    props.onChangeTab("Events");
  };
  const clickAteliersTabHandler = () => {
    props.onChangeTab("Ateliers");
  };
  const clickOrganizationsTabHandler = () => {
    props.onChangeTab("Organizations");
  };

  return (
    <ul className="tabs-list">
      <li
        onClick={clickEventsTabHandler}
        className={props.tabSelected === "Events" ? "selected" : undefined}
      >
        {props.locale === "en" ? "Events" : "Événements"}
      </li>
      {/* <li
        onClick={clickAteliersTabHandler}
        className={props.tabSelected === "Ateliers" ? "selected" : undefined}
      >
        {props.locale === "en" ? "Workshops" : "Ateliers"}
      </li> */}
      <li
        onClick={clickOrganizationsTabHandler}
        className={
          props.tabSelected === "Organizations" ? "selected" : undefined
        }
      >
        {props.locale === "en" ? "Organizations" : "Organisations"}
      </li>
    </ul>
  );
};

export default Tabs;
