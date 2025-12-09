// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: Tailwind or global styles
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Find the root element defined in public/index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with ID "root" not found in index.html');
}

// Create the root container for React 18
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
