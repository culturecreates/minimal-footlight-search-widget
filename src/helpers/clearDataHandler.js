import { Tabs } from "../constants/tabs";

export const clearDataHandler = ({
  tab,
  setWorkshops,
  setEvents,
  setOrganizations,
}) => {
    console.log(tab);
  if (tab === Tabs.ORGANIZATIONS) {
    setWorkshops([]);
    setEvents([]);
  } else if (tab === Tabs.WORKSHOPS) {
    setEvents([]);
    setOrganizations([]);
  } else if (tab === Tabs.EVENTS) {
    setWorkshops([]);
    setOrganizations([]);
  }
};
