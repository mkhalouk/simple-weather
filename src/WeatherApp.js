import './WeatherApp.css';
import React from 'react';


class WeatherApp extends React.Component {
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
      <div className='bg'>
        <div className='search-container'>
          <h2 className='title'>Weather forecast</h2>
          <div className='search-box'>
            <input class="cityname" id='city' type="text" name="cityname" placeholder='Entrer le nom de votre ville'></input>
            <button className='submit' onClick={null}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}



export default WeatherApp;
