import React from "react";
import "moment/locale/es";
import "./noContent.css";
import { dateFormatter } from "../helpers/helpers";

function NoContent(props) {
  const { message, date, locale } = props;
  const formatedDateText = dateFormatter(date, locale);

  return (
    <div className="no-content-wrapper">
      <p>{message}</p>
      <p>{formatedDateText}</p>
    </div>
  );
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.isLoading === nextProps.isLoading;   // neccssery to prevent date from updating before loading appear
}

export default React.memo(NoContent, arePropsEqual);
