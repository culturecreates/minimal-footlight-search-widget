import moment from "moment";

export const dateFormatter = (date, locale) => {
  moment.locale(locale);
  const flag = date !== "undefined" && date !== "null"; // true if date is valid

  if (flag) {
    if (date.includes(",")) {
      // for date range selection
      const dateArray = date.split(",").map((dateItem) => {
        const inputDate = moment(
          dateItem,
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
        );
        return inputDate.format("DD MMMM YYYY").toUpperCase();
      });
      return dateArray.join(" - ");
    } else {
      // for single date selection
      const inputDate = moment(date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
      return inputDate.format("DD MMMM YYYY").toUpperCase();
    }
  }
};
