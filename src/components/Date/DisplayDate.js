const DisplayDate = (props) => {
  const { date, locale, monthFormat, yearFormat} = props;
  const dateTimeOptions = {
    day: "numeric",
    month: monthFormat,
    year: yearFormat,
    timeZone: "Asia/Kolkata",
  };
  return new Intl.DateTimeFormat(locale, { ...dateTimeOptions }).format(
    new Date(date)
  );
};

export default DisplayDate;
