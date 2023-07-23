import React from "react";
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
            {t('datepicker.rangeSelectLabel')}
          </label>
        </div>

        <button onClick={handleDateErase}>
          {t('datepicker.eraseButtonLabel')}
        </button>
      </div>
      <Calendar
        onChange={searchDateHandler}
        value={searchDate}
        selectRange={!isSingleDate}
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
