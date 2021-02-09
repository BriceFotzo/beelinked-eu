import React from 'react';
import CurrentWeather from './CurrentWeather'
import { MDBBox } from 'mdbreact';




function MeteoBox(props){

  return (
    <MDBBox >
    
          <CurrentWeather weather={props.weather} temp={props.temp}/> 
          
          <p>Temps {props.weather}</p>
          <p> Humidité: {props.hum}%</p>
          <p> Vent: {props.vent} km/h</p>

  </MDBBox>
  )

}
export default MeteoBox