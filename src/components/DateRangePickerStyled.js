import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./DateRangePickerStyled.css";
import { ReactComponent as CalendarIcon } from "../assets/icons/Calendar.svg";

function DateRangePickerStyled(props) {
  const { setDateType, dateType, setSearchDate, searchDate } = props;
  // const [open, setOpen] = useState(false);

  return (
    <div className="date-range-wrapper">
      <DateRangePicker
        onChange={setSearchDate}
        value={searchDate}
        calendarClassName="date-range-calendar-wrapper"
        calendarIcon={<CalendarIcon />}
        // format={`dd MMM y`}
        // isOpen={open}
        clearIcon={false}
        // onCalendarOpen={() => setOpen(true)}
        // onCalendarClose={() => setOpen(false)}
        // dayPlaceholder=""
        // monthPlaceholder=""
        // yearPlaceholder=""
        rangeDivider={""}
      />
      {/* {dateType && (
        <div className="change-calendar-type-wrapper">
          <label className="checkbox-label">
            <input
              type="checkbox"
              style={{}}
              className="change-calendar-type"
              checked={dateType === "single" ? true : false}
              onChange={(e) =>
                setDateType(e.target.checked ? "single" : "range")
              }
            />
            Rechercher à une date précise
          </label>
        </div>
      )} */}
    </div>
  );
}
export default DateRangePickerStyled;
