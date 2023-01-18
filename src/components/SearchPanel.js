import EventsList from "./EventsList";
import SearchFooter from "./SearchFooter";
import classes from "./SearchPanel.module.css";

const SearchPanel = (props) => {
  let content = <p>Pas de resultats</p>;
  if (props.events.length > 0) {
    content = (
      <>
        <EventsList events={props.events} />
        {props.totalCount > 5 && <SearchFooter count={props.totalCount} />}
      </>
    );
  }

  if (props.error) {
    content = <p>An error occured</p>;
  }

  if (props.isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className={classes.holder}>
      <div className={classes.panel}>{content}</div>
    </div>
  );
};

export default SearchPanel;
