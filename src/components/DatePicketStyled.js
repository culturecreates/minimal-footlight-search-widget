import React from "react";
import DatePicker from "react-date-picker";
import "./DatePickerStyled.css";

function DatePickerStyled(props) {
  const { setDateType, setSearchDate, searchDate } = props;

  return (
    <div className="single-date-wrapper">
      <DatePicker
        onChange={setSearchDate}
        value={searchDate}
        dayPlaceholder="dd"
        monthPlaceholder="MMM"
        yearPlaceholder="yyyy"
        format="dd MMM yyyy"
        calendarClassName="single-date-calendar-wrapper"
      />
    </div>
  );
}

export default DatePickerStyled;
