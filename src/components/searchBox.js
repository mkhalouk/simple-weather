
import React from 'react';

const SearchBox = (props) => {
    return (
        <div className='search-box'>
        <input class="cityname" id='city' type="text" name="cityname" placeholder='Entrer le nom de votre ville'></input>
        <button className='submit' onClick={null}>Submit</button>
    </div>
    );
}

export default SearchBox;

