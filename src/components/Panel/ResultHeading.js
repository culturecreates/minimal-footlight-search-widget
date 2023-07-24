import React from "react";
import { DateFormatter } from "../Date/DateFormatter";
import { useTranslation } from "react-i18next";

function ResultHeading(props) {
  const { searchDate = null, locale, tabSelected } = props;

  const { t } = useTranslation();

  let headingText = "";

  if (searchDate === null) {
    headingText = t("resultHeader.next");
  } else if (searchDate !== null && tabSelected !== "Organizations") {
    headingText = <DateFormatter date={searchDate} locale={locale} />;
  } else {
    headingText = t("resultHeader.today");
  }

  return (
    <div className="result-header">
      {tabSelected !== "Organizations" ? headingText : ""}
    </div>
  );
}

export default React.memo(ResultHeading, (prevProps, nextProps) => {
  return prevProps.isLoading === nextProps.isLoading;
});
