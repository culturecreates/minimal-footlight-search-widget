import React from "react";
import Event from "./Event";
import Organization from "../Organization/Organization";
import "./EventsList.css";
import { Tabs } from "../../constants/tabs";
import NoContent from "../Noresult/NoContent";
import { useTranslation } from "react-i18next";

const EventsList = (props) => {
  const {
    tabSelected,
    events,
    widgetProps,
    workshop,
    searchDate,
    organizations,
    locale,
    isLoading,
  } = props;
  const { t } = useTranslation();

  const message = t(`noResult.${tabSelected}`);

  let content = (
    <NoContent
      message={message}
      date={searchDate}
      locale={locale}
      isLoading={isLoading}
      tabSelected={tabSelected}
    />
  );

  return (
    <ul className="events-list">
      {tabSelected === Tabs.ORGANIZATIONS &&
        (organizations.length > 0
          ? organizations
              ?.slice(0, 9)
              ?.map((event) => (
                <Organization
                  key={event.id}
                  event={event}
                  eventUrl={widgetProps.orgUrl}
                  locale={widgetProps.locale}
                />
              ))
          : content)}
      {tabSelected === Tabs.EVENTS &&
        (events.length > 0
          ? events
              ?.slice(0, 9)
              ?.map((event) => (
                <Event
                  key={event.id}
                  event={event}
                  eventUrl={widgetProps.eventUrl}
                  locale={widgetProps.locale}
                />
              ))
          : content)}
      {tabSelected === Tabs.WORKSHOPS &&
        (workshop.length > 0
          ? workshop
              ?.slice(0, 9)
              ?.map((event) => (
                <Event
                  key={event.id}
                  event={event}
                  eventUrl={widgetProps.eventUrl}
                  locale={widgetProps.locale}
                />
              ))
          : content)}
    </ul>
  );
};

export default EventsList;
