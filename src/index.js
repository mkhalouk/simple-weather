import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './javascript/WeatherApp';
import reportWebVitals from './reportWebVitals';
import tick from './javascript/threejs/script'

tick();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);



reportWebVitals();
