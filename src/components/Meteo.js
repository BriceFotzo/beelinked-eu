import React, { useState, useEffect,Component } from 'react'
import WeatherCard from './WeatherCard'
import axios from 'axios'

class Meteo extends Component {
  
 
      
      state= {
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
      
  
  getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }


   getMeteoData=function() {
    this.getPosition()
    .then((position) => {
      console.log(position.coords);
      this.setState({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      })
      console.log('lat',this.state.latitude)
      var meteoUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+this.state.latitude+"&lon="+this.state.longitude+"&exclude=minutely,hourly&units=metric&appid=abc4a77a01557d7b01feba325151d239"
      var locationUrl="https://api-adresse.data.gouv.fr/reverse/?lon="+this.state.longitude+"&lat="+this.state.latitude
     //distance(location, "48.864923, 2.382842", 1)
      var meteoPrecUrl ="https://public.opendatasoft.com/api/records/1.0/search/?dataset=arome-0025-sp1_sp2&q=%23distance(position,%22"+parseInt(this.state.latitude)+","+parseInt(this.state.longitude)+"%22,100)"
     if (this.state.latitude!=0 || this.state.longitude!=0){
      
      axios.all([
        
        axios.get(meteoUrl),
        axios.get(locationUrl),
        axios.get(meteoPrecUrl)
      ])
      .then(response => {
        
        this.setState({
          loading: false,
          temperature:response[0].data.current.temp,
          humidite:response[0].data.current.humidity,
          precipitation:response[2].data.records[9].fields.total_water_precipitation,
          pression:response[0].data.current.pressure,
          data:response[0].data,
          location:response[1].data.features[0].properties.context
        }
          )

        console.log(meteoPrecUrl)
        
        console.log('OpenWeather: ', response[0].data);
        console.log('ApiAdress: ', response[1].data);
        console.log('Prec: ', response[2].data.records[9].fields.total_water_precipitation);
      
        var MeteoData={
          temperature:this.state.temperature,
          humidite:this.state.humidite,
          precipitation:this.state.precipitation,
          pression:this.state.pression,
          latitude:this.state.latitude,
          longitude:this.state.longitude
        }
  
       axios.post('http://localhost:3000/saveMeteoData',MeteoData).then((res)=>
        console.log(res)).catch((err) => {
          console.log("Erreur lors de l'ajout de la ruche : ", err)
        })

   })
  }
     else{
      console.log(this.state.latitude)
       console.log("Loading... Don't have position yet")
       
     }
    })
      
   
  }
  

  componentDidMount(){  
    console.log('Did mount')

    this.getMeteoData();
    if (this.state.latitude!=0 || this.state.longitude!=0){


    }
     

    
  }
render(){
  console.log('Render')
  return (
    <div>
        <iframe  className="meteo_"   margin-top= "250px" seamless width="888" height="450" frameborder="0" src="https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=49.38,1.18&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=VU8FEg5wXH4CLwYxBnBReANrUmcBdwUiB3sLaFs%2BBXgEb1EwUzNRNwRqVyoDLAM1Ay4DYA02UGBTOAJ6WylUNVU%2FBWkOZVw7Am0GYwYpUXoDLVIzASEFIgdgC2pbKAVnBG5RNlMuUTIEdVc0AzYDMQMvA3wNM1BuUzECZVs1VDdVPwVgDm9cOgJyBnsGM1EzA2ZSYAE7BWgHZAtoWzEFZQQ0UTRTYlEzBHVXNwM2AzQDMANnDTFQbVMxAnpbKVROVUUFfA4tXHwCOAYiBitRMANuUmY%3D&_c=852fe1f558735722d9891f7c27bd3b93">
        
        </iframe>
      {
          (this.state.loading)
          ? <div className="WeatherCard"><p>Loading ... </p>
          </div>

          : <div className="hidden">
            <WeatherCard  data={this.state.data} location={this.state.location} prec={this.state.precipitation}/>
            
          </div>
        }
        
    </div>    )

}

}
    
export default Meteo
