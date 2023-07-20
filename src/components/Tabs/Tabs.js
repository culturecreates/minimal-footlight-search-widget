import "./Tabs.css";

const Tabs = (props) => {
  const {
    // setSearchDate,
    // setStartDateSpan,
    // setEndDateSpan,
    tabSelected,
    locale,
    onChangeTab,
  } = props;

  const clickEventsTabHandler = () => {
    onChangeTab("Events");
  };
  const clickAteliersTabHandler = () => {
    onChangeTab("Ateliers");
  };
  const clickOrganizationsTabHandler = () => {
    onChangeTab("Organizations");
  };

  return (
    <ul className="tabs-list">
      <li
        onClick={clickEventsTabHandler}
        className={tabSelected === "Events" ? "selected" : undefined}
      >
        {locale === "en" ? "Events" : "Événements"}
      </li>
      <li
        onClick={clickAteliersTabHandler}
        className={tabSelected === "Ateliers" ? "selected" : undefined}
      >
        {locale === "en" ? "Workshops" : "Ateliers"}
      </li>
      <li
        onClick={clickOrganizationsTabHandler}
        className={tabSelected === "Organizations" ? "selected" : undefined}
      >
        {locale === "en" ? "Organizations" : "Organisations"}
      </li>
    </ul>
  );
};

export default Tabs;
