import React, { useState } from "react";
import Calendar from "react-calendar";

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
    // setIsPopoverOpen(!isPopoverOpen);
    // textInputRef.current.focus();
    // setTextFocus(true);
  };

  return (
    <div style={{ width: "auto%", maxWidth: "40%" }}>
      <div>
        <input
          type="checkbox"
          style={{ height: "24px", width: "24px" }}
          checked={isSingleRange}
          onChange={(e) => setIsSingleDate(e.target.checked)}
        />
        <label>
          {locale === "en" ? "Single date" : "Rechercher à une date précise"}
        </label>
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
