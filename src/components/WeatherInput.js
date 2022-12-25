import { useState } from "react";
import './WeatherInput.css';

const WeatherInput = (props) => {
    const [cityName, setCityName] = useState('');

    const inputHandler = (event) => {
        setCityName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onInput(cityName);
        setCityName("");
    };
    return(
        <div className="wrap">
            <form onSubmit={submitHandler} className='search'>
                <input
                    placeholder="Enter City Name"
                    value={cityName}
                    onChange={inputHandler}
                    className='searchTerm'
                ></input>
                <button type="submit" className='searchButton'>
                    <i className="gg-search"></i>
                </button>
            </form>
        </div>
    );
};

export default WeatherInput;
