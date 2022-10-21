import './WeatherApp.css';
import React from 'react';
import SearchBox from './components/searchBox';

class WeatherApp extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      api_key : "3d74c79ef4464434bb1f6e3602dd4a21",// 1000 call per day free
      longitude : 0,
      latitude : 0,
      limit : 5,
      showsearchCard : false,
    }
    this.getLatLonFromCity = this.getLatLonFromCity.bind(this);
    this.currentWeather = this.currentWeather.bind(this);
    this.setSearchCardStatus = this.setSearchCardStatus.bind(this);
    /*this.setState(() => {
      limit : 5
    })*/
  }

  async getLatLonFromCity(city) {
    const res = await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit="+this.state.limit+"&appid="+this.state.api_key).json();
    return res;
  }

  currentWeather(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+this.state.api_key)
    .then((response) => response.json())
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((succes) => {
      //succes.coords.latitude;
      //succes.coords.longitude;
    });
  }

  setSearchCardStatus(){
    this.setState({ showsearchCard : !this.state.showsearchCard})
  }

  render() {
    return (
      <div className='bg'>
        <div className='search-container'>
          <h2 className='title'>Weather forecast</h2>
          <div className='main-searchbox'>
          <button className='search-btn-this'>Your city</button>
          <button className='search-btn-another' onClick={this.setSearchCardStatus}>Some city</button>
          {this.state.showsearchCard === true ? <SearchBox/> : <div></div>}
          </div>
        </div>
      </div>
    )
  }
}



export default WeatherApp;
