import React, { useState } from "react";
import DatePicker from "react-date-picker";

function DatePickerStyled(props) {
  const { setDateType } = props;
  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div id="calendar-div">
      <DatePicker
        // isOpen={open}
        onChange={setValue}
        value={value}
        // portalContainer={document.getElementById("calendar-div")}
        // onCalendarOpen={() => setOpen(true)}
        // onCalendarClose={() => setOpen(false)}
      />
      {/* {open && <>hai</>} */}
    </div>
  );
}

export default DatePickerStyled;
