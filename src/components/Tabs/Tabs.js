import { useTranslation } from "react-i18next";
import { Tabs as TABS } from "../../constants/tabs";
import "./Tabs.css";

const Tabs = (props) => {
  const { tabSelected, onChangeTab, availableTabs } = props;
  const { t } = useTranslation();

  const tabClickHandler = (tab) => {
    onChangeTab(tab);
  };

  return (
    <ul className="tabs-list">
      {availableTabs && availableTabs.includes(TABS.EVENTS) && (
        <li
          key={TABS.EVENTS}
          onClick={() => tabClickHandler(TABS.EVENTS)}
          className={tabSelected === TABS.EVENTS ? "selected" : undefined}
        >
          {t("tabs.Events")}
        </li>
      )}

      {availableTabs && availableTabs.includes(TABS.WORKSHOPS) && (
        <li
          key={TABS.WORKSHOPS}
          onClick={() => tabClickHandler(TABS.WORKSHOPS)}
          className={tabSelected === TABS.WORKSHOPS ? "selected" : undefined}
        >
          {t("tabs.Ateliers")}
        </li>
      )}

      {availableTabs && availableTabs.includes(TABS.ORGANIZATIONS) && (
        <li
          key={TABS.ORGANIZATIONS}
          onClick={() => tabClickHandler(TABS.ORGANIZATIONS)}
          className={
            tabSelected === TABS.ORGANIZATIONS ? "selected" : undefined
          }
        >
          {t("tabs.Organizations")}
        </li>
      )}
    </ul>
  );
};

export default Tabs;
