import React, { Component, useState } from 'react'
// import NavBar from './components/NavBar'
// import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles }from '@material-ui/core/styles';
import MeteoBox from './MeteoBox'

function Meteo() {
  
  var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  
  const [getLat, setLat] = useState(0);
  const [getLong, setLong] = useState(0);
  const [getTemp, setTemp] = useState(0);
  const [getHum, setHum] = useState(0);
  const [getVent, setVent] = useState(0);
  const [getPrec, setPrec] = useState(0);
  
  getPosition()
    .then((position) => {
      console.log(position);
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      var url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=arome-0025-sp1_sp2&q=%23distance(position%2C+%22"+parseInt(getLat)+"%2C+"+parseInt(getLong)+"%22%2C+100)"
      console.log(url)
      fetch(url)
        .then((response) => response.json())
        .then(data => {
          console.log(data)
          setTemp(parseInt(data.records[0].fields.maximum_temperature_at_2_metres))
          setHum(parseInt(data.records[0].fields.relative_humidity))
          setVent(parseInt(data.records[0].fields.wind_speed))
          setPrec(parseInt(data.records[0].fields.total_water_precipitation*100))
                      })
                  })
    .catch((err) => {
        console.error(err.message);
    })
  
    return (
      <MeteoBox temp={getTemp} hum={getHum} vent={getVent} prec={getPrec} />
    )
  
}

export default Meteo
