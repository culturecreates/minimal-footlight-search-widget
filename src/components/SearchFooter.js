import "./SearchFooter.css";

const SearchFooter = (props) => {
  const { count, locale, onSubmit } = props;
  let msg;
  const style =
    count <= 0
      ? {
          background: "var(--primary-light-yellow, #F2EB9F)",
        }
      : {
          background: "var(--primary-flash-yellow, #fff649)",
        };

  if (count > 0) {
    msg = locale === "en" ? "VIEW ALL" : "voir tous les résultats";
  } else {
    msg = locale === "en" ? "NO RESULTS" : "PAS DE RESULTATS";
  }

  return (
    <div
      className="footer-submit"
      onClick={count > 0 ? onSubmit : undefined}
      style={style} // Fixed this line
    >
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
