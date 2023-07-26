import React, { useState } from "react";
import Calendar from "react-calendar";
import { dateConverter } from "../../helpers/helper";
import prevButton from "../../assets/icons/prev-button.svg";
import nextButton from "../../assets/icons/next-button.svg";
import next2Button from "../../assets/icons/next2-button.svg";
import prev2Button from "../../assets/icons/prev2-button.svg";
import "./calendar.css";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const [activeStartDate, setActiveStartDate] = useState();
  const [view, setView] = useState("month");
  const [calendarKey, setCalendarKey] = useState(1); // Added to forcefully reset the selected date during range selection.

  // handlers

  const searchDateHandler = (value) => {
    setSearchDate(value);
    if (!isSingleDate) {
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
    if (isSingleDate && !Array.isArray(searchDate)) {
      setCalendarKey((prevState) => prevState + 1); // So reset button can reset date when in the middle of selection.
      setSearchDate(null);
      setStartDateSpan("");
    } else if (isSingleDate) {
      setSearchDate(null);
      setStartDateSpan("");
    } else if (dateConverter(searchDate) !== dateConverter(new Date())) {
      console.log("c", searchDate);
      setSearchDate(new Date());
      setStartDateSpan(dateConverter(new Date()));
    }

    setEndDateSpan("");
    setActiveStartDate(new Date());
    setView("month");
  };

  const handleDateSelectionTypeChange = (e) => {
    if (e.target.checked && !Array.isArray(searchDate)) {
      setCalendarKey((prevState) => prevState + 1); // So reset button can reset date when in the middle of selection.
      setSearchDate(null);
      setStartDateSpan("");
    } else if (e.target.checked) {
      setSearchDate(null);
      setStartDateSpan("");
    } else {
      setSearchDate(new Date());
      setStartDateSpan(new Date());
    }
    // setSearchDate(new Date());
    setIsSingleDate(e.target.checked);
    setStartDateSpan(null);
    setEndDateSpan(null);
    setView("month");
    setActiveStartDate(new Date());
  };

  const drillDownHandler = (activeStartDate, view) => {
    setView(view);
    setActiveStartDate(activeStartDate);
  };

  const drillUpHandler = (activeStartDate, view) => {
    setView(view);
    setActiveStartDate(activeStartDate);
  };

  const handleNavigation = (activeStartDate) => {
    setActiveStartDate(activeStartDate);
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
              checked={isSingleDate}
              onChange={(e) => handleDateSelectionTypeChange(e)}
            />
            <span></span>
            {t("datepicker.rangeSelectLabel")}
          </label>
        </div>

        <button onClick={handleDateErase}>
          {t("datepicker.eraseButtonLabel")}
        </button>
      </div>
      <Calendar
        key={calendarKey}
        onChange={searchDateHandler}
        value={searchDate}
        activeStartDate={activeStartDate}
        onDrillDown={({ activeStartDate, view }) =>
          drillDownHandler(activeStartDate, view)
        }
        onDrillUp={({ activeStartDate, view }) =>
          drillUpHandler(activeStartDate, view)
        }
        onActiveStartDateChange={({ action, activeStartDate, value, view }) =>
          handleNavigation(activeStartDate)
        }
        goToRangeStartOnSelect={true}
        view={view}
        selectRange={isSingleDate}
        className="react-calendar-wrapper"
        locale={locale}
        prevLabel={<img src={prevButton} alt=""></img>}
        prev2Label={<img src={prev2Button} alt=""></img>}
        next2Label={<img src={next2Button} alt=""></img>}
        nextLabel={<img src={nextButton} alt=""></img>}
      />
    </div>
  );
}

export default Calender;
