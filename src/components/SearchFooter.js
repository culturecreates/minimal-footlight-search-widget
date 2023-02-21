import "./SearchFooter.css";

const SearchFooter = (props) => {
  return (
    <div className="footer-submit" onClick={props.onSubmit}>
      <p>VOIR TOUT - {props.count}</p>
    </div>
  );
};

export default SearchFooter;
