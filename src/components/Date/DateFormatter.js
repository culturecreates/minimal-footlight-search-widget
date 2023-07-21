import {displayDate} from "../../helpers/helper.js";

export const DateFormatter = (props) => {
  const { date, locale, monthFormat = "short", yearFormat = "2-digit" } = props;
  const flag = date !== undefined && date !== null; // true if date is valid
  let text = "";
console.log(date);
  if (flag) {
    if (Array.isArray(date)) {
      // for date range selection
      const dateArray = date.map((dateItem) => {
        return displayDate(dateItem, locale, monthFormat, yearFormat);
      });
      text = (
        <div>
          {dateArray[0]}
          &nbsp; - &nbsp;
          {dateArray[1]}
        </div>
      );
    } else {
      // for single date selection
      text = displayDate(date, locale, monthFormat, yearFormat).replace(",","  ");
    }
  }
  return <>{text}</>;
};
