import logo from './logo.svg';
import './WeatherApp.css';
import React from 'react';


class WeatherApp extends React.Component{
  api_key = "3d74c79ef4464434bb1f6e3602dd4a21"; // 1000 call per day free
  longitude = 0;
  latitude = 0;
  limit = 5;

  constructor(props) {
    super(props);


  }

  async getLatLonFromCity(city) {
    const res = await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit="+limit+"&appid="+api_key).json();
    return res;
  }

  currentWeather(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key)
    .then((response) => response.json())
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>Helllooooo</div>
    )
  }
}

  

export default WeatherApp;
