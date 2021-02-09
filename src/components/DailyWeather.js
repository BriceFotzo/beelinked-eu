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



function DailyWeather(props){
  const result = props.data
  const date = new Date(result.dt * 1000)
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var weather = result.weather[0].description
  var weatherDesc = result.weather[0].main
  let weatherIcon
  const maxTemp = Math.round(result.temp.max)
  const minTemp = Math.round(result.temp.min)


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


  return(
    <div>
      <center>
      <MDBTypography type="display1">
        {weekday[date.getDay()]}
      </MDBTypography>
      <img src={`${weatherIcon}`} alt="WeatherIcon" height="64" width="64" />
      <MDBTypography type="subheading" >
        {`${maxTemp}° ${minTemp}°`}
      </MDBTypography>
      <MDBTypography type="subheading" >
        {weatherDesc}
      </MDBTypography>
      </center>
    </div>
  )
}
export default DailyWeather
