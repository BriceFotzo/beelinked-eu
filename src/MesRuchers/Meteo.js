import MeteoComponent from '../components/Meteo'
import React, {Component} from 'react';


export default class Meteo extends Component{
  
    state = {
        userStatus: JSON.parse(localStorage.getItem('userCo')).Statut
      }
    render(){
        return(
            <div>
                  <MeteoComponent />
            </div>      
        )
    }
}
