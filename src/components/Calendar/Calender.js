import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { dateConverter } from "../../helpers/helper";
import { iconContainerClassNames } from "../../helpers/helper";
// import prevButton from "../../assets/icons/prev-button.svg"
// import prev2Button from "../../assets/icons/prev2-button.svg"
// import nextButton from "../../assets/icons/next-button.svg"
// import next2Button from "../../assets/icons/next2-button.svg"
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

  // handlers

  const searchDateHandler = (value) => {
    setSearchDate(value);
    if (isSingleRange) {
      setStartDateSpan(dateConverter(new Date(value)));
      setEndDateSpan(null);
    } else {
      if (value[0] !== null) {
        setStartDateSpan(dateConverter(new Date(value[0])));
        setEndDateSpan(dateConverter(new Date(value[1])));
      } else {
        setStartDateSpan(null);
        setEndDateSpan(null);
      }
    }
  };

  const handleDateErase = () => {
    if (searchDate !== null) {
      setSearchDate(null);
      setStartDateSpan(null);
      setEndDateSpan(null);
    }
  };

  const handleDateSelectionTypeChange = (e) => {
    setIsSingleDate(e.target.checked);

    setSearchDate(null);
    setStartDateSpan(null);
    setEndDateSpan(null);
  };

  // effects

  useEffect(() => {
    iconContainerClassNames.forEach((item) => {
      const myElement = document.getElementsByClassName(
        `react-calendar__navigation__${item}`
      )[0];

      if (!myElement) {
        return; // If the element is not found, skip to the next iteration
      }

      myElement.textContent = "";
      myElement.style.backgroundImage = `url('./${item}.svg')`;
      myElement.style.backgroundSize = "contain";
      myElement.style.backgroundRepeat = "no-repeat";
      myElement.style.backgroundPosition = "center";
    });
  }, []);

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
