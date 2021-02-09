import axios from "axios";


//plus d'infos : https://geo.api.gouv.fr/adresse

export default function getAdresseByCoords(adresse,options) {
  let url0="https://api-adresse.data.gouv.fr/search/?q="
 
  let url =url0+adresse
  let coords
  
  axios.get(url).then((response) =>  {
    console.log(response)
    
    coords= response.data.features[0].geometry.coordinates
    console.log("longitude :", coords[0],"latitude:",coords[1])
    
    
  }).catch((err)=>{
    
    console.log("ERREUR :", err)
    coords =false
  })  
  return coords
}
