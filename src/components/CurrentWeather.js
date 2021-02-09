import React from 'react';
import { MDBTypography } from 'mdbreact'
import clearsky from './icons/01d.png'
import fewclouds from './icons/02d.png'
import 	scatteredclouds from './icons/03d.png'
import brokenclouds from './icons/04d.png'
import showerrain from './icons/09d.png'
import rain from './icons/10d.png'
import thunderstorm from './icons/11d.png'
import 	snow from './icons/13d.png'
import defaultIcon from './icons/50d.png'


function CurrentWeather(props) {
  
  var weather = props.data.weather.description
  var temp=props.data.temp
  let weatherIcon
  console.log(weather)
  switch(weather) {
    case 'clear sky':
        weatherIcon = clearsky
        break
    case 'few clouds':
        weatherIcon = fewclouds
        break
    case 'scattered clouds':
        weatherIcon = scatteredclouds
        break
    case 'broken clouds':
        weatherIcon = brokenclouds
        break
    case 'shower rain':
        weatherIcon = showerrain
        break
    case 'rain':
        weatherIcon = rain
        break
    case 'thunderstorm':
        weatherIcon = thunderstorm
        break
    case 'snow':
        weatherIcon = snow
        break
    case 'overcast clouds':
      weatherIcon = brokenclouds
      break
    default:
      weatherIcon = defaultIcon
}

const currentTemp = Math.round(temp)

  return (
    <div >
      <div className="CurrentWeather" >
        <img src={`${weatherIcon}`} alt="WeatherIcon" />
        <MDBTypography className="CurrentWeatherText" type="display4"  >
          {`${currentTemp}°`}
        </MDBTypography>
      </div>
    </div>
  );
}


export default CurrentWeather