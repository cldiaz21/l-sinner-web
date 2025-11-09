import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fixPointerEvents } from './utils/fixPointerEvents';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Asegurar que los elementos interactivos funcionen después del renderizado
setTimeout(() => {
  fixPointerEvents();
}, 100);
setTimeout(() => {
  fixPointerEvents();
}, 500);

