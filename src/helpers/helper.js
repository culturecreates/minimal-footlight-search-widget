export const displayDate = (date, locale, monthFormat, yearFormat) => {
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
