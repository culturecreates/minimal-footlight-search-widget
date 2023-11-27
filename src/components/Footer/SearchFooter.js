import "./SearchFooter.css";
import { useTranslation } from "react-i18next";
import { Tabs } from "../../constants/tabs";

const SearchFooter = (props) => {
  const {
    onSubmit,
    totalCountEvents,
    totalCountWorkshops,
    totalCountOrganizations,
    isLoading,
    tabSelected,
  } = props;

  const { t } = useTranslation();

  let msg, count;
  const style =
    count <= 0
      ? {
          background: "var(--primary-light-yellow, #F2EB9F)",
        }
      : {
          background: "var(--primary-flash-yellow, #fff649)",
        };

  if (count > 0) {
    msg = t("footer.seeAll");
  } else {
    msg = t("footer.noItems");
  }

  if (isLoading) {
    count = "-";
  } else if (tabSelected === Tabs.ORGANIZATIONS) {
    count = totalCountOrganizations;
  } else if (tabSelected === Tabs.WORKSHOPS) {
    count = totalCountWorkshops;
  } else {
    count = totalCountEvents;
  }

  return (
    <div
      className="footer-submit"
      onClick={count > 0 ? onSubmit : undefined}
      style={style}
      data-testid="footer"
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
