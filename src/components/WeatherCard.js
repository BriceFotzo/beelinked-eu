import React from 'react';
import CurrentWeather from './CurrentWeather'
import WeatherDetails from './WeatherDetails'
import WeeklyWeather from './WeeklyWeather'
import { MDBTypography } from 'mdbreact'

function SimpleCard(props) {
 
  const result = props.data
  const cityName = props.location
  const country = result.timezone
  const today = new Date(result.current.dt * 1000)
  const weatherDescription =  result.current.weather.description 
  const now = new Date()
  const prec=props.prec
 

  return (
    <div >
          <MDBTypography type="display3"   >
          {`${cityName}, ${country}`}
          </MDBTypography>
          <MDBTypography type="display1"  >
            {`${today.toDateString()}, ${now.toLocaleTimeString()}`}
          </MDBTypography>
          <MDBTypography type="display1"  >
            {weatherDescription}
          </MDBTypography>
          <div className="CurrentWeatherBox" >
            <CurrentWeather data= {result.current}/>
            <WeatherDetails data= {result.current} prec={prec}/>
        </div>
       
          <div >
          <WeeklyWeather  data={result.daily}/>
          </div>
    </div>
  );
}



export default SimpleCard;