
import React from 'react';

const SearchBox =  (props) =>  {

    return (
        <div className='search-box'>
        <input className="cityname" id='city' type="text" name="cityname" placeholder='Entrer le nom de votre ville'></input>
        <button className='submit' onClick={props.currentWeather}>Submit</button>
    </div>
    );
}

export default SearchBox;

