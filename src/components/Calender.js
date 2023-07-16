import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

function Calender(props) {
  const {
    locale,
    setSearchDate,
    setStartDateSpan,
    setEndDateSpan,
    searchDate,
  } = props;

  const [isSingleRange, setIsSingleDate] = useState(false);

  const searchDateHandler = (value) => {
    setSearchDate(value);
    setStartDateSpan(new Date(value[0] ?? value).toISOString().slice(0, 10));
    if (value[0]) {
      setEndDateSpan(new Date(value[1]).toISOString().slice(0, 10));
    } else {
      setEndDateSpan(null);
    }
  };

  const handleDateErase = () => {
    setSearchDate(null);
    setStartDateSpan(null);
    setEndDateSpan(null);
  };

  const handleDateSelectionTypeChange = (e) => {
    setIsSingleDate(e.target.checked);

    setSearchDate(null);
    setStartDateSpan(null);
    setEndDateSpan(null);
  };

  return (
    <div
      style={{
        maxWidth: "40%",
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
