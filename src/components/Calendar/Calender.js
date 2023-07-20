import React, { useState } from "react";
import Calendar from "react-calendar";
import { dateConverter } from "../../helpers/helper";
import "./calendar.css";

function Calender(props) {
  const {
    locale,
    setSearchDate,
    setStartDateSpan,
    setEndDateSpan,
    endDateSpan,
    searchDate,
    startDateSpan,
    setIsLoading,
  } = props;

  const [isSingleRange, setIsSingleDate] = useState(false);

  const searchDateHandler = (value) => {
    setSearchDate(value);
    if (isSingleRange) {
      setStartDateSpan(dateConverter(new Date(value)));
      setEndDateSpan(null); // Clear the end date span for single date selection
    } else {
      if (value !== null) {
        setStartDateSpan(dateConverter(new Date(value[0])));
        setEndDateSpan(dateConverter(new Date(value[1])));
      } else {
        setStartDateSpan(null);
        setEndDateSpan(null);
        setIsLoading(false); // Reset the loading state when the date range is cleared
      }
    }
  };

  const handleDateErase = () => {
    setSearchDate(null);
    setStartDateSpan(null);
    setEndDateSpan(null);
    setIsLoading(false); // Reset the loading state when the date is erased
  };

  const handleDateSelectionTypeChange = (e) => {
    if (isSingleRange) {
      setSearchDate(null);
      setStartDateSpan(null);
      setEndDateSpan(null);
    } else {
      setSearchDate([null, null]);
    }
    setIsSingleDate(e.target.checked);
    setIsLoading(false); // Reset the loading state (if needed)
  };

  return (
    <div
      style={{
        minHeight: "500px",
        borderLeft: "1px solid var(--primary-light-grey, #000)",
      }}
    >
      <div className="calendar-control">
        <div>
          <label>
            <input
              type="checkbox"
              id="single-date-control"
              style={{ height: "24px", width: "24px" }}
              checked={isSingleRange}
              onChange={(e) => handleDateSelectionTypeChange(e)}
            />
            <span></span>
            {locale === "en" ? "Single date" : "Rechercher à une date précise"}
          </label>
        </div>

        <button onClick={handleDateErase}>
          {locale === "en" ? "Erase" : "Effacer"}
        </button>
      </div>
      <Calendar
        onChange={searchDateHandler}
        value={searchDate}
        selectRange={!isSingleRange}
        className="react-calendar-wrapper"
        locale={locale}
      />
    </div>
  );
}

export default Calender;
