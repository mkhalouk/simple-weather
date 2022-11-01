import React from 'react';

const WeatherCard =  (props) =>  {

    /*TODO
    Pre compute the value inside utils before rendering result
    */
    return (
        <div className='result-box'>
        <h2 className='resultname'>{props.result.name}</h2>
        <h1 className='resulttemp'>{Math.round(props.result.main.temp) - 273}°C</h1>
    </div>
    );
}

export default WeatherCard;