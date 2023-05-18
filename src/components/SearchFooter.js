import "./SearchFooter.css";

const SearchFooter = (props) => {

  let msg;
  if (props.count > 0 ){
    msg = (props.locale === "en" ? "VIEW ALL" : "VOIR TOUT") + " - " + props.count
  } else {
    msg = props.locale === "en" ? "NO RESULTS" : "PAS DE RESULTATS" ;
  }
  
  return (
    <div className="footer-submit" onClick={props.count > 0 ? props.onSubmit : "#"}>
      <p>{msg}</p>
    </div>
  );
};

export default SearchFooter;
