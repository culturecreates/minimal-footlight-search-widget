export const displayDate = (date, locale, monthFormat, yearFormat) => {
  const dateTimeOptions = {
    day: "numeric",
    month: monthFormat,
    year: yearFormat,
    timeZone: "Asia/Kolkata",
  };
  const formatedDate = new Intl.DateTimeFormat(locale, {
    ...dateTimeOptions,
  }).format(new Date(date));

  const flag = monthFormat === "short" && yearFormat !== "2-digit";
  let parts = "";
  let month = "";
  let day = "";
  let year = "";
  if (flag) {
    parts = formatedDate.split(" ");
    month = parts[0];
    day = parts[1];
    year = parts[2];
  } else {
    return formatedDate;
  }
  return `${day} ${month} ${year}`;
};

export const dateConverter = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const paddedDay = String(day).padStart(2, "0");
  const paddedMonth = String(month).padStart(2, "0");
  const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;
  return formattedDate;
};

export const iconContainerClassNames = [
  "prev2-button",
  "prev-button",
  "next-button",
  "next2-button",
];

// export const iconContainerClassNames = {
//   prevButton: "prev2-button",
//   prev2Button: "prev-button",
//   nextButton: "next-button",
//   next2Button: "next2-button",
// };
