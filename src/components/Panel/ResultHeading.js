import React from "react";
import { DateFormatter } from "../Date/DateFormatter";

function ResultHeading(props) {
  const { searchDate = null, locale, tabSelected } = props;
  let headingText = "";

  if (searchDate === null ) {
    headingText = locale === "fr" ? "Prochainement" : "Upcoming";
  } else if (Array.isArray(searchDate) || tabSelected !== "Organizations") {
    headingText = <DateFormatter date={searchDate} locale={locale} />;
  } else {
    headingText = locale === "fr" ? "Aujourd’hui" : "Today";
  }

  return <div className="result-header">{headingText}</div>;
}

export default React.memo(ResultHeading, (prevProps, nextProps) => {
  return prevProps.isLoading === nextProps.isLoading;
});
