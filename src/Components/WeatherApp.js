import React , {useState} from 'react'
import './Weather.css'

import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import humidity from '../Assets/humidity.png';
import rain from '../Assets/rain.png';
import search from '../Assets/search.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';
import drizzle from '../Assets/drizzle.png';

function WeatherApp() {
    let APIKey = 'd475b4a75f46becdc75f7032a03ad157 ';
    const [wicon , setWicon] = useState(cloud);

    const searchCity = async() => {
        const element = document.getElementsByClassName('cityInput');
        if(element[0].value === ""){
            return 0;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${APIKey}`;
        let response = await fetch(url).then((response) => response.json());
        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-percent');
        const tempature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('location');
    
        humidity[0].innerHTML = response.main.humidity + "%";
        wind[0].innerHTML = Math.floor(response.wind.speed) + "km/h";
        tempature[0].innerHTML = Math.floor(response.main.temp) + "°";
        location[0].innerHTML = response.name;

        if(response.weather[0].icon === '01d' || response.weather[0].icon === '01n'){
            setWicon(clear);
        }
        else if(response.weather[0].icon === '02d' || response.weather[0].icon === '02n'){
            setWicon(cloud);
        }
        else if(response.weather[0].icon === '10d' || response.weather[0].icon === '10n'){
            setWicon(rain);
        }
        else if(response.weather[0].icon === '13d' || response.weather[0].icon === '13n'){
            setWicon(snow);
        }
        else if(response.weather[0].icon === '11d' || response.weather[0].icon === '11n'){
            setWicon(wind);
        }
        else if(response.weather[0].icon === '04d' || response.weather[0].icon === '04n'){
            setWicon(drizzle);
        }
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Enter your city' />
                <div className="searchicon" onClick={() => searchCity()}>
                    <img src={search} alt='Search' />
                </div>
            </div>
            <div className="weather-img">
                <img src={cloud} alt='Weather' />
            </div>
            <div className="weather-temp">
                25°C
            </div>
            <div className="location">
                London
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity} alt="" className="icon" />
                </div>
                <div className="data">
                    <div className="humidity-percent">
                        52%
                    </div>
                    <div className="text">Humidity</div>

                </div>
                <div className="element">
                    <img src={wind} alt="" className="icon" />
                </div>
                <div className="data">
                    <div className="wind-percent">
                        18 km/h
                    </div>
                    <div className="text">Wind</div>

                </div>
            </div>
        </div>
    )
}

export default WeatherApp