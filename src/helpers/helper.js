export const displayDate = (date, locale, monthFormat, yearFormat) => {
  const dateTimeOptions = {
    day: "numeric",
    month: monthFormat,
    year: yearFormat,
    timeZone: "Asia/Kolkata",
  };
  const formatedDate = new Intl.DateTimeFormat(locale, { ...dateTimeOptions }).format(
    new Date(date)
  );

  const parts = formatedDate.split(' '); // Split the string into parts
  const month = parts[0];
  const day = parts[1].slice(0, -1); 
  const year = parts[2];

  return `${day} ${month} ${year}`
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