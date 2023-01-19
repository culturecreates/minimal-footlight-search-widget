import EventsList from "./EventsList";
import SearchFooter from "./SearchFooter";
import  "./SearchPanel.css";

const SearchPanel = (props) => {
  let content = <p>Pas de resultats</p>;
  if (props.events.length > 0) {
    content = (
      <>
        <EventsList eventUrl={props.eventUrl} events={props.events} />
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
    <div className='panel-anchor'>
      <div className='panel-float'>{content}</div>
    </div>
  );
};

export default SearchPanel;
