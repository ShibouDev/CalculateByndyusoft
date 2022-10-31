import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calculate from './main/Calculate';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Calculate />
  </React.StrictMode>
);
