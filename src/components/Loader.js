import React from "react";

function Loader(props) {
  const {
    //  text,
    icon,
  } = props;
  return (
    <div className="loader">
      {icon !== undefined && icon !== null ? (
        <img src={icon} alt="loader img"></img>
      ) : (
        <></>
      )}
      <p>{/* {text} */}</p>
    </div>
  );
}

export default Loader;
