import React from "react";
import { DateFormatter } from "../Date/DateFormatter";
import { useTranslation } from "react-i18next";
import { Tabs } from "../../constants/tabs";

function ResultHeading(props) {
  const {
    searchDate = null,
    locale,
    tabSelected,
    totalCountEvents,
    totalCountWorkshops,
  } = props;

  const tabFlag =
    tabSelected !== Tabs.ORGANIZATIONS &&
    ((tabSelected === Tabs.EVENTS && totalCountEvents !== 0) ||
      (tabSelected === Tabs.WORKSHOPS && totalCountWorkshops !== 0));

  const { t } = useTranslation();

  let headingText = "";

  if (searchDate === null) {
    headingText = t("resultHeader.next");
  } else if (searchDate !== null && tabFlag) {
    headingText = <DateFormatter date={searchDate} locale={locale} />;
  } else {
    headingText = t("resultHeader.today");
  }

  return tabFlag ? <div className="result-header">{headingText}</div> : <></>;
}

export default React.memo(ResultHeading, (prevProps, nextProps) => {
  return prevProps.isLoading === nextProps.isLoading;
});
