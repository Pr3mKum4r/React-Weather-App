import React, { useEffect, useMemo, useState } from 'react';
import './WeatherApp.css';
import WeatherInput from './WeatherInput';

const WeatherApp = () => {
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const [city, setCity] = useState('London');
    const [weatherData, setWeatherData] = useState(null);
    const [toggle, setToggle] = useState('false');

    let options = { weekday: 'long'};
    let today  = new Date();
    let day = today.toLocaleString('en-US', options);

    const inputHandler = (cityName) =>{
        //console.log(cityName);
        setCity(cityName);
    }

    const getWeatherData = (ApiKey, City) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${ApiKey}`;
        fetch(url)
            .then((res) =>{
                if(res.status >= 400) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then((res) =>{
                setWeatherData(res);
                setCity(City);
            })
            .catch((err)=>{
                console.log("Error", err);
                setWeatherData(null);
            })
    }

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    useMemo(()=>{ //renders whenever cityName changes
        getWeatherData(API_KEY, city);
    }, [city]);

    useEffect(()=>{
        if(toggle){
            document.body.style.background = '#dff9fb';
        }
        else{
            document.body.style.background = '#212047';
        }
    }, [toggle])

    
    return(
        <React.Fragment>
        <input type='checkbox' id='switch' onClick={toggleHandler}/><label htmlFor="switch">Toggle</label>
        <h3 className={toggle ? "NightModeTitle" : "NightModeTitle-night"}>Night Mode</h3>
        <div className={toggle ? "Container" : "Container-night"}>
            <WeatherInput onInput={inputHandler}></WeatherInput>
            <div className='WeatherData-Container'>
            {!weatherData ? (
                <h1 className={toggle ? "h1": "h1-night"}>City Not Found</h1>
            ) : (
                <div className='details-Container'>
                    <div className='img-Container'>
                        <img src={require(`../assets/${weatherData.weather[0].icon}.png`)}className={toggle ? "weather-img" : "weather-img-night"} alt="img"></img>  
                    </div>
                    <div className='weather-Container'>
                        <h1 className={toggle ? "h1": "h1-night"}>{city}</h1>
                        <h3 className={toggle ? "h3": "h3-night"}>{weatherData.weather[0].main}</h3>
                        <h3 className={toggle ? "h3": "h3-night"}>{day}</h3>
                        <h1 className={toggle ? "temp h1": "temp-night"}>{weatherData.main.temp}&deg;C</h1>
                        <h3 className={toggle ? "h3": "h3-night"}>Pressure: {weatherData.main.pressure} mb</h3>
                        <h3 className={toggle ? "h3": "h3-night"}>Humidity: {weatherData.main.humidity}%</h3>
                    </div>
                </div>
            )}
            </div>
        </div>
        </React.Fragment>
    )
}

export default WeatherApp;