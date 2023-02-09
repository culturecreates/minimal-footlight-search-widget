import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./DateRangePickerStyled.css";

function DateRangePickerStyled(props) {
  const { setDateType } = props;
  const [value, setValue] = useState();

  return (
    <div className="date-range-wrapper">
      <DateRangePicker
        onChange={setValue}
        value={value}
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
