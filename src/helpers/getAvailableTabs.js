import { Tabs } from "../constants/tabs";

export const getAvailableTabs = ({
  eventSearchUrl,
  orgSearchUrl,
  searchEventsFilter,
}) => {
  let tabs = [];
  if (eventSearchUrl) {
    tabs.push(Tabs.EVENTS);
  }
  if (searchEventsFilter !== "") {
    tabs.push(Tabs.WORKSHOPS);
  }
  if (orgSearchUrl) {
    tabs.push(Tabs.ORGANIZATIONS);
  }
  return tabs;
};
