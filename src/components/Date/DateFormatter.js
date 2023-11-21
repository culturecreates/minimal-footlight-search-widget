import { displayDate } from "../../helpers/helper.js";
import line from "../../assets/icons/Line 24.svg";

export const DateFormatter = (props) => {
  const { date, locale, monthFormat = "short", yearFormat = "2-digit" } = props;
  const flag = date !== undefined && date !== null; // true if date is valid
  let text = "";
  if (date == null || date == "null" || !date) {
    return <></>;
  }
  if (flag) {
    if (Array.isArray(date)) {
      // for date range selection
      const dateArray = date.map((dateItem) => {
        return displayDate(dateItem, locale, monthFormat, yearFormat);
      });

      text = (
        <>
          {dateArray[0]}
          &nbsp;<img src={line} alt=""></img> &nbsp;
          {dateArray[1]}
        </>
      );
    } else {
      // for single date selection
      text = displayDate(date, locale, monthFormat, yearFormat);
    }
  }
  return (
    <div className="formatted-date" data-testid="formatted-date">
      {text}
    </div>
  );
};
