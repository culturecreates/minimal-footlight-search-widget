import React from "react";
import "./noContent.css";
import { DateFormatter } from "../Date/DateFormatter";

function NoContent(props) {
  const { message, date, locale } = props;
  return (
    <div className="no-content-wrapper">
      <div>{message}</div>
      <div>
        <DateFormatter
          date={date}
          locale={locale}
          monthFormat="long"
          yearFormat="numeric"
        />
      </div>
    </div>
  );
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.isLoading === nextProps.isLoading; // neccssery to prevent date from updating before loading appear
}

export default React.memo(NoContent, arePropsEqual);