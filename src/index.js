import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './javascript/WeatherApp';
import reportWebVitals from './reportWebVitals';
import executeOnce from './javascript/threejs/script'

//executeOnce("c");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);



reportWebVitals();
