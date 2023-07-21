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

export const dateConverter = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const paddedDay = String(day).padStart(2, "0");
  const paddedMonth = String(month).padStart(2, "0");
  const formattedDate = `${year}/${paddedMonth}/${paddedDay}`;
  return formattedDate;
};

export const iconContainerClassNames = ["prev2-button","prev-button","next-button","next2-button"]