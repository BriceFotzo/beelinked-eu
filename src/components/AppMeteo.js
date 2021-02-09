import React, { Component } from 'react';
import axios from 'axios'
import AppBar from './components/AppBar'
import FloatingActionButton from './components/FloatingActionButton'
import WeatherCard from './WeatherCard'




class App extends Component {

  constructor(){
    super()
    this.state={
      weather: [],
      loading: true
    }
  }

  componentDidMount(){
    axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&APPID=79badf94102e008963c2d50b6cfa43f2&units=metric&cnt=8')
      .then(response =>{
        this.setState({
          weather:response.data,
          loading:false
        })
      })
      .catch(error =>{
        console.log('Error fetching and parsing data',error)
      })
  }

  render() {
    return (
      <div>
        <AppBar/>
        <iframe seamless width="888" height="336" frameborder="0" src="https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=48.85341,2.3488&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=VU8FEg5wXH4CLwYxBnBReANrUmcBdwUiB3sLaFs%2BBXgEb1EwUzNRNwRqVyoDLAM1Ay4DYA02UGBTOAJ6WylUNVU%2FBWkOZVw7Am0GYwYpUXoDLVIzASEFIgdgC2pbKAVnBG5RNlMuUTIEdVc0AzYDMQMvA3wNM1BuUzECZVs1VDdVPwVgDm9cOgJyBnsGM1EzA2ZSYAE7BWgHZAtoWzEFZQQ0UTRTYlEzBHVXNwM2AzQDMANnDTFQbVMxAnpbKVROVUUFfA4tXHwCOAYiBitRMANuUmY%3D&_c=852fe1f558735722d9891f7c27bd3b93">
          
        </iframe>
        <div>
          {
            (this.state.loading)
            ? <p>Loading . . . </p>
            : <WeatherCard data={this.state.weather}/>
          }
        </div>
        <FloatingActionButton/>
      </div>
    );
  }
}

export default App;