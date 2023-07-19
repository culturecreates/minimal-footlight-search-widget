import React from "react";

function Loader(props) {
  const { text, icon } = props;
  return (
    <div className="loader">
      {icon !== undefined && icon !== null ? (
        <img src={icon} alt="loader img"></img>
      ) : (
        <></>
      )}
      {text}
    </div>
  );
}

export default Loader;
