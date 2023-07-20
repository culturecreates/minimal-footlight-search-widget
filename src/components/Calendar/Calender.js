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
    searchDate,
    setIsLoading,
  } = props;

  const [isSingleRange, setIsSingleDate] = useState(false);

  const searchDateHandler = (value) => {
    if (isSingleRange) {
      setSearchDate(value);
      setStartDateSpan(dateConverter(new Date(value)));
    }
    else{
      setStartDateSpan(dateConverter(new Date(value[0])));
    }
    
    if (value[0]) {
      setEndDateSpan(dateConverter(new Date(value[1])));
      setIsLoading(true);
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

    if (searchDate !== null) {
      setSearchDate(null);
      setStartDateSpan(null);
      setEndDateSpan(null);
    }
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
