import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const widget = document.getElementById("minimal-footlight-search-widget");
const root = ReactDOM.createRoot(widget);
root.render(
  <App
    api={widget.dataset.api}
    eventUrl={widget.dataset.eventUrl}
    searchUrl={widget.dataset.searchUrl}
    calendar={widget.dataset.dataCalendar}
    locale={widget.dataset.locale}
  />
);
