import React from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App";

const widget = document.getElementById("minimal-footlight-search-widget");

const root = createRoot(widget);
root.render(
  <App
    api={widget.dataset.api}
    eventUrl={widget.dataset.eventUrl}
    orgUrl={widget.dataset.orgUrl}
    searchEventsUrl={widget.dataset.searchEventsUrl}
    searchOrgsUrl={widget.dataset.searchOrgsUrl}
    calendar={widget.dataset.calendar}
    locale={widget.dataset.locale}
    searchPanelState={widget.dataset.searchPanel}
    searchEventsFilter={widget.dataset.searchEventsFilter}
  />
);
