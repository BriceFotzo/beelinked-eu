import axios from "axios";
import { useState } from 'react';

//plus d'infos : https://geo.api.gouv.fr/adresse

const GetAddressByCoords=()=> {
  
  let url0="https://api-adresse.data.gouv.fr/reverse/?"
 // var long=coords.longitude
  //var lat=coords.latitude
 
  const [adresse, setAddress] = useState("test");

  var long= 2.254278
  var lat=  48.841031

  //var adresse="test";
  let url =url0+"lon="+long+"&lat="+lat
  
  axios.get(url).then((response) =>  {
    console.log(response)
    setAddress(response.data.features[0].properties.label)
    
  }).catch((err)=>{
    setAddress(false)
    console.log("ERREUR :", err)
    
  })  
  return (
    <div>
      {adresse}
    </div>
  );
}
export default GetAddressByCoords;

