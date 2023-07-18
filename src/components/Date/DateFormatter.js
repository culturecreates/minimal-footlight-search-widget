import DisplayDate from "./DisplayDate";

export const DateFormatter = (props) => {
  const { date, locale, monthFormat = "short", yearFormat = "2-digit" } = props;
  const flag =
    date !== undefined &&
    date !== null; // true if date is valid
  let text = "";

  if (flag) {
    if (Array.isArray(date)) {
      // for date range selection
      const dateArray = date.map((dateItem) => {
        return (
          <DisplayDate
            date={dateItem}
            locale={locale}
            monthFormat={monthFormat}
            yearFormat={yearFormat}
          />
        );
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
      text = (
        <DisplayDate
          date={date}
          locale={locale}
          monthFormat={monthFormat}
          yearFormat={yearFormat}
        />
      );
    }
  }
  return <>{text}</>;
};
