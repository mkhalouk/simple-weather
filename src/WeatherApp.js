import './WeatherApp.css';
import React from 'react';


class WeatherApp extends React.Component {

  constructor(props) {
    super(props);


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
