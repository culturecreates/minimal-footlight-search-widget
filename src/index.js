import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const widget = document.getElementById('minimal-footlight-search-widget');
const root = ReactDOM.createRoot(widget);
root.render(
  <App api={widget.dataset.api} eventUrl={widget.dataset.eventUrl}/>
);
