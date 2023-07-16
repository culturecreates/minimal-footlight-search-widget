import "./SearchFooter.css";

const SearchFooter = (props) => {
  const { count, locale, onSubmit } = props;
  let msg;
  if (count > 0) {
    msg = locale === "en" ? "VIEW ALL" : "voir tous les résultats";
  } else {
    msg = locale === "en" ? "NO RESULTS" : "PAS DE RESULTATS";
  }

  return (
    <div className="footer-submit" onClick={count > 0 ? onSubmit : undefined}>
      <div>
        {msg}
        <div className="count">
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchFooter;
