import React from 'react';
import { MDBTypography } from 'mdbreact'


function WeatherDetails(props) {
  const result = props.data
  
  const humidity = Math.round(result.humidity)
  const windSpeed = result.wind_speed
  const windDegree= result.wind_deg
  const precipitation = props.prec
  const pressure = Math.round(result.pressure)

  return (
    <div className="WeatherDetails">
      <div >
        <MDBTypography className="WeatherDetailsTypo" type="display3"  >
          Humidité: {`${humidity}%`}
        </MDBTypography>
      </div>

      <div >
        <MDBTypography className="WeatherDetailsTypo" type="display3"  >
          Vent: {`${windSpeed} m/s ${windDegree}°`}
        </MDBTypography>
      </div>

      <div >
        <MDBTypography className="WeatherDetailsTypo" type="display3"  >
          Précipitations: {`${Math.round(precipitation*100)}% `}
        </MDBTypography>
      </div>
      <div >
        <MDBTypography className="WeatherDetailsTypo" type="display3"  >
          Pression: {`${pressure} hPa`}
        </MDBTypography>
      </div>


    </div>
  );
}



export default WeatherDetails