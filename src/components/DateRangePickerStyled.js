import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./DateRangePickerStyled.css";

function DateRangePickerStyled(props) {
  const { setDateType, setSearchDate, searchDate } = props;

  return (
    <div className="date-range-wrapper">
      <DateRangePicker
        onChange={setSearchDate}
        value={searchDate}
        calendarClassName="date-range-calendar-wrapper"
        format="dd MMM yyyy"
        dayPlaceholder="dd"
        monthPlaceholder="MMM"
        yearPlaceholder="yyyy"
      />
    </div>
  );
}
export default DateRangePickerStyled;
