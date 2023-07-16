import React from "react";
import moment from "moment";
import 'moment/locale/es'
import "./noContent.css"

function NoContent(props) {
  const { message, date,locale } = props;

  const day = moment(date).format("Do");
  moment.locale(locale);
  const formatedDateText = moment(date).format('MMMM YYYY');

  return (
    <div className="no-content-wrapper">
      <p>{message}</p>
      <p>{day +"th " +formatedDateText}</p>
    </div>
  );
}

export default NoContent;
