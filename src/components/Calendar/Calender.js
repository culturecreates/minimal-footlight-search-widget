import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { dateConverter } from "../../helpers/helper";
import { iconContainerClassNames } from "../../helpers/helper";

import "./calendar.css";

function Calender(props) {
  const {
    locale,
    setSearchDate,
    setStartDateSpan,
    setEndDateSpan,
    searchDate,
    isSingleDate,
    setIsSingleDate,
  } = props;

  // handlers

  const searchDateHandler = (value) => {
    setSearchDate(value);
    if (isSingleDate) {
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
        return;
      }

      myElement.textContent = "";

      const imageElement = document.createElement("img");
      import(`../../assets/icons/${item}.svg`)
        .then((icon) => {
          imageElement.src = icon.default;
        })
        .catch((error) => {
          console.error(`Error loading icon: ${error}`);
        });

      imageElement.style.width = "100%";
      imageElement.style.height = "100%";
      imageElement.style.objectFit = "contain";

      myElement.appendChild(imageElement);
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
              checked={isSingleDate}
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
        selectRange={!isSingleDate}
        className="react-calendar-wrapper"
        locale={locale}
      />
    </div>
  );
}

export default Calender;
