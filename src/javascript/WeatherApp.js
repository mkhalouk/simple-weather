import '../css/WeatherApp.css';
import React from 'react';
import SearchBox from './components/searchBox';
import WeatherCard from './components/WeatherCard';
import executeOnce from './threejs/script';

class WeatherApp extends React.Component {

  /*TODO
  Add these static values into .env files or proprety files 
  */
  constructor(props) {
    super(props);
    this.state = {
      api_key : "3d74c79ef4464434bb1f6e3602dd4a21",// 1000 call per day free
      longitude : 0,
      latitude : 0,
      limit : 5,
      showsearchCard : false,
      showresultCard : false,
      result : null
    }
    this.getLatLonFromCity = this.getLatLonFromCity.bind(this);
    this.currentWeather = this.currentWeather.bind(this);
    this.forecastDays = this.forecastDays.bind(this);
    this.setSearchCardStatus = this.setSearchCardStatus.bind(this);
    /*this.setState(() => {
      limit : 5
    })*/
  }

  /* TODO : 
  Pass this function in utils and its api call in services.
  The info to load which 3D model is inside : "response.weather[0].main"
  Always handle exceptions
  */ 
  async getLatLonFromCity(city) {
    return (await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+this.state.api_key)
    .then((response) => response.json()))[0];
  }

  // FIXME: This api call is not included in the free subscription
  /* TODO : 
  Pass this function inside services and handle any unti conversion inside utils.
  Always handle exceptions
  */ 
  async forecastDays() {
    const city = document.getElementById('city').value;
    const coord = (await this.getLatLonFromCity(city));

    const data = await fetch("api.openweathermap.org/data/2.5/forecast/daily?lat="+coord.lat+"&lon="+coord.lon+"&cnt=5&appid="+this.state.api_key)
    .then((response) => response);

    this.setState({result : data, showresultCard : true, showsearchCard  : false});
  }

  /* TODO : 
  Same. Pass this function inside services and handle any unti conversion inside utils.
  Always handle exceptions
  */ 
  async currentWeather() {
    const city = document.getElementById('city').value;
    const coord = await this.getLatLonFromCity(city);

    const data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+coord.lat+"&lon="+coord.lon+"&appid="+this.state.api_key)
    .then((response) => {
      return response.json()
    });
    executeOnce(data.weather[0].main)
    document.getElementsByClassName("main-searchbox")[0].style.display = "none"
    this.setState({result : data, showresultCard : true, showsearchCard  : false});
  }

  /*TODO
  Replace the 'Your location' Button with this ...
  and have the else of this function automatically open up the searchBox component
  */
  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition();
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }


  componentDidMount() {
  }

  setSearchCardStatus(){
    this.setState({ showsearchCard : !this.state.showsearchCard})
  }

  /*TODO :
  We pass all this code bellow inside pages forlder and call that component from here
  -Possible name for that component : HomePage.js-
  -Create a HomePage.css for that component and put it inside css folder
  */
  render() {
    return (
        <div className='search-container'>
          <h2 className='title'>Weather forecast</h2>
          <div className='main-searchbox'>
          <button className='search-btn-this' onClick={this.setSearchCardStatus}>Your location</button>
          <button className='search-btn-another' onClick={this.setSearchCardStatus}>Type a location</button>
          {this.state.showsearchCard === true ? <SearchBox currentWeather={this.currentWeather} /> : <div></div>}
          </div>
          {this.state.showresultCard === true ? <WeatherCard result={this.state.result} /> : <div></div>}

        </div>
    )
  }
}



export default WeatherApp;
