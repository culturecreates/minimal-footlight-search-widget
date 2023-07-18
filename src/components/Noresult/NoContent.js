import React from "react";
import "moment/locale/es";
import "./noContent.css";
import { DateFormatter } from "../Date/DateFormatter";

function NoContent(props) {
  const { message, date, locale } = props;
  return (
    <div className="no-content-wrapper">
      <p>{message}</p>
      <p>
        <DateFormatter
          date={date}
          locale={locale}
          monthFormat="long"
          yearFormat="numeric"
        />
      </p>
    </div>
  );
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.isLoading === nextProps.isLoading; // neccssery to prevent date from updating before loading appear
}

export default React.memo(NoContent, arePropsEqual);
