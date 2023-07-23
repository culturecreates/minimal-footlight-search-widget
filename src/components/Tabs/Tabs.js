import { useTranslation } from "react-i18next";
import "./Tabs.css";

const Tabs = (props) => {
  const {
    tabSelected,
    onChangeTab,
  } = props;

  const { t } = useTranslation();

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
        {t("tabs.1")}
      </li>
      <li
        onClick={clickAteliersTabHandler}
        className={tabSelected === "Ateliers" ? "selected" : undefined}
      >
        {t("tabs.2")}
      </li>
      <li
        onClick={clickOrganizationsTabHandler}
        className={tabSelected === "Organizations" ? "selected" : undefined}
      >
        {t("tabs.3")}
      </li>
    </ul>
  );
};

export default Tabs;
