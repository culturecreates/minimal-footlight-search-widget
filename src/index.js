import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const widget = document.getElementById("minimal-footlight-search-widget");
const root = ReactDOM.createRoot(widget);
root.render(
  <App
    api={widget.dataset.api}
    eventUrl={widget.dataset.eventUrl}
    orgUrl={widget.dataset.orgUrl}
    searchEventsUrl={widget.dataset.searchEventsUrl}
    searchOrgsUrl={widget.dataset.searchOrgsUrl}
    calendar={widget.dataset.calendar}
    locale={widget.dataset.locale}
  />
);