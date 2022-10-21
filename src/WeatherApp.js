import './WeatherApp.css';
import React from 'react';


class WeatherApp extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      api_key : "3d74c79ef4464434bb1f6e3602dd4a21",// 1000 call per day free
      longitude : 0,
      latitude : 0,
      limit : 5
    }
    this.getLatLonFromCity = this.getLatLonFromCity.bind(this);
    this.currentWeather = this.currentWeather.bind(this);
  }

  async getLatLonFromCity(city) {
    return await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+this.state.api_key)
    .then((response) => response.json());
  }

  async currentWeather() {
    const city = document.getElementById('city').value;
    const coord = await this.getLatLonFromCity(city);

    const data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+coord[0].lat+"&lon="+coord[0].lon+"&appid="+this.state.api_key)
    .then((response) => response.json());

    /**
     * @param object data
     * in order to access to the weather infos uneed to typically use data.main
     * (which contains temperature, pressure, humidity etc..). Uncomment the
     * the following line to show all details
     */
    // console.log(data);

    return data;
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
            <button className='submit' onClick={this.currentWeather}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}



export default WeatherApp;
