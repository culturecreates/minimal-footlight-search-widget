import "./SearchFooter.css";
import { useTranslation } from "react-i18next";

const SearchFooter = (props) => {
  const { count, onSubmit } = props;

  const { t } = useTranslation();

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
    msg = t('footer.seeAll');
  } else {
    msg = t('footer.noItems');
  }

  return (
    <div
      className="footer-submit"
      onClick={count > 0 ? onSubmit : undefined}
      style={style} 
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
