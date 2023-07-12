const DisplayDate = (props) => {
  const dateTimeOptions = {
    day: "numeric",
    month: "short",
    year: "2-digit",
    timeZone: "America/Montreal",
  };
  return new Intl.DateTimeFormat("en-UK", { ...dateTimeOptions }).format(new Date(props.date))
}

export default DisplayDate;