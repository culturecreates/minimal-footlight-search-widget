import { Tabs } from "../constants/tabs";

export const getAvailableTabs = ({
  apiAteliersUrl,
  apiOrganizationsUrl,
  apiEventsUrl,
}) => {
  let tabs = [];
  if (apiEventsUrl) {
    tabs.push(Tabs.EVENTS);
  }
  if (apiAteliersUrl !== "") {
    tabs.push(Tabs.WORKSHOPS);
  }
  if (apiOrganizationsUrl) {
    tabs.push(Tabs.ORGANIZATIONS);
  }
  return tabs
};
