import React, { useState, useEffect,Component } from 'react'
import WeatherCard from './WeatherCard'
import axios from 'axios'

class Meteo extends Component() {
  
  constructor(props)
  {
      super(props);
      
      this.state= {
          loading: true,
          temperature:0,
          humidite:0,
          precipitation:0,
          pression:0,
          latitude:0,
          longitude:0,
          data:[],
          location:''
         
      }
      
  }
  getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }


   getMeteoData() {
    
      console.log('lat',latitude)
      var meteoUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=minutely,hourly&units=metric&appid=abc4a77a01557d7b01feba325151d239"
      var locationUrl="https://api-adresse.data.gouv.fr/reverse/?lon="+longitude+"&lat="+latitude
     //distance(location, "48.864923, 2.382842", 1)
      var meteoPrecUrl ="https://public.opendatasoft.com/api/records/1.0/search/?dataset=arome-0025-sp1_sp2&q=%23distance(position,%22"+parseInt(latitude)+","+parseInt(longitude)+"%22,100)"
     if (latitude!=0 || longitude!=0){
      
      axios.all([
        
        axios.get(meteoUrl),
        axios.get(locationUrl),
        axios.get(meteoPrecUrl)
      ])
      .then(response => {
        console.log(latitude)
        this.setState({
          loading: false,
          temperature:response[0].data.current.temp,
          humidite:esponse[0].data.current.humidity,
          precipitation:response[2].data.records[9].fields.total_water_precipitation,
          pression:response[0].data.current.pressure,
          data:response[0].data,
          location:response[1].data.features[0].properties.context
        }
          )
        // setHum(response[0].data.current.humidity)
        // setPres(response[0].data.current.pressure)
        // setTemp(response[0].data.current.temp)
        // setLoc(response[1].data.features[0].properties.context)
        // setPrec(response[2].data.records[9].fields.total_water_precipitation)
        // setLoading(false)
        console.log(meteoPrecUrl)
        
        console.log('OpenWeather: ', response[0].data);
        console.log('ApiAdress: ', response[1].data);
        console.log('Prec: ', response[2].data.records[9].fields.total_water_precipitation);
      


   })}
     else{
       console.log("Loading... Don't have position yet")
       
     }
   
  }
  
// cron.schedule('*/1 * * * *', () => {
//   console.log('running a task in 5 minutes');
//   getMeteoData();
// })
componentWillMount(){
     console.log('will mount')} 
  componentDidMount(){  
    getPosition()
    .then((position) => {
      console.log(position.coords);
      this.setState({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      })
    })
    if (latitude!=0 || longitude!=0){

      var MeteoData={
        temperature:temperature,
        humidite:humidite,
        precipitation:precipitation,
        pression:pression,
        latitude:latitude,
        longitude:longitude
      }

     axios.post('http://localhost:3000/saveMeteoData',MeteoData).then((res)=>
      console.log(res)).catch((err) => {
        console.log("Erreur lors de l'ajout de la ruche : ", err)
      })
    }
      getMeteoData();
      // return ()=>{
      //   console.log('do something')
      // }
    
  }
render(){
  return (
    <div>
        <iframe seamless width="888" height="336" frameborder="0" src="https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=49.38,1.18&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=VU8FEg5wXH4CLwYxBnBReANrUmcBdwUiB3sLaFs%2BBXgEb1EwUzNRNwRqVyoDLAM1Ay4DYA02UGBTOAJ6WylUNVU%2FBWkOZVw7Am0GYwYpUXoDLVIzASEFIgdgC2pbKAVnBG5RNlMuUTIEdVc0AzYDMQMvA3wNM1BuUzECZVs1VDdVPwVgDm9cOgJyBnsGM1EzA2ZSYAE7BWgHZAtoWzEFZQQ0UTRTYlEzBHVXNwM2AzQDMANnDTFQbVMxAnpbKVROVUUFfA4tXHwCOAYiBitRMANuUmY%3D&_c=852fe1f558735722d9891f7c27bd3b93">
        
        </iframe>
      {
          (getLoading)
          ? <div className="WeatherCard"><p>Loading ... </p>
          </div>

          : <div className="WeatherCard">
            <WeatherCard  data={getData} location={getLoc} prec={precipitation}/>
            
          </div>
        }
        
    </div>    )

}

}
    
export default Meteo
