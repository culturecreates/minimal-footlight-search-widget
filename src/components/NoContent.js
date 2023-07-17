import React from "react";
import moment from "moment";
import "moment/locale/es";
import "./noContent.css";

function NoContent(props) {
  const { message, date, locale, isLoading } = props;
  let day = "";
  let formatedDateText = "";

  const flag = date !== "undefined" && date !== "null" && !isLoading;
  if (flag) {
    if (date.includes(",")) {
      console.log("works");
    } else {
      day = moment(date).format("Do");
      moment.locale(locale);
      formatedDateText = moment(date).format("MMMM YYYY");
    }
  }

  return (
    <>
      {!isLoading ? (
        <div className="no-content-wrapper">
          <p>{message}</p>
          <p>{flag && day.slice(0, day.length - 1) + " " + formatedDateText}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

// Custom comparison function for memoization
function arePropsEqual(prevProps, nextProps) {
  // Only re-render if the `isLoading` prop has changed
  return prevProps.isLoading === nextProps.isLoading;
}

export default React.memo(NoContent, arePropsEqual);
