import React, {Component,useEffect,useState} from 'react'
import { Popup,MapContainer, TileLayer, Marker,useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {  iconPerson  } from './Icons';
import ApiMapInfo from './ApiMapInfo';
import axios from 'axios'
const env = require('../config');



function LocationMarker(props) {
    const [data, setData] = useState([])
    const [position, setPosition] = useState(null)
    const [userCo, setUserCo] = useState(props.effectOn.props.userCo)

    const map = useMapEvents({
        click() {
            map.locate()
        },
        moveend() {
            let center = map.getCenter();
            let zoom = map.getZoom();

            props.effectOn.setState(state => {
                state.lat = center.lat;
                state.lng = center.lng;
                return { ...state }
            });
        },
        locationfound(e) {
            setPosition(e.latlng)
            console.log({Myposition:e.latlng})
            map.flyTo(e.latlng, map.getZoom())
        },
    })
    useEffect(()=>{
        axios.get(env.serverPath+':'+env.serverPort+'/apiculteurs')
    .then((response) => {
     console.log("apiculteurs",response.data)
     setData(response.data.map((item,key)=>({...item,LatLng:{
        lat:item.Latitude,lng:item.Longitude
    }, pos:[item.Latitude,item.Longitude]
        
    })))

    })
    },[])
    // let newData=data.map((item,key)=>({...item,LatLng:{
    //     lat:item.Latitude,lng:item.Longitude
    // }, pos:[item.Latitude,item.Longitude]
        
    // }))
    console.log("data Map",data)
    
    return (
        <div>
            {data.map((item,idx)=>
                
                item.mapIsActive ?
                item.allIsActive?
                <Marker key={`marker-${idx}`}  icon={ iconPerson } position={item.pos}>
                    <Popup>
                        <ApiMapInfo NAPI={item.NAPI} Adresse={item.Adresse} Email={item.Email} nbRuchers={item.nbRuchers} nbRuches={item.Ruches} TypeMiel={item.TypeMiel} cp={item.CP} Ville={item.Ville} telephone={item.Telephone}  userCo ={userCo}/>
                    </Popup>
                </Marker>
                : item.withoutAddress?
                <Marker key={`marker-${idx}`}  icon={ iconPerson } position={item.pos}>
                    <Popup>
                        <ApiMapInfo NAPI={item.NAPI} Email={item.Email} nbRuchers={item.nbRuchers} nbRuches={item.Ruches} TypeMiel={item.TypeMiel} cp={item.CP} Ville={item.Ville} telephone={item.Telephone} userCo ={userCo}/>
                    </Popup>
                </Marker>
                :''
                : ''
            )}
        </div>)
}

class Map extends Component{
   
    constructor(props) {
        super(props);
        // console.log("props of butt", this.props)
        this.state = {
            result: this.props,
            disable: false,
            lat: 49,
            lng: 1,
            userCo: []
        }
    }
    componentWillMount(){
        console.log(this.props)
       let userCoList = [...this.state.userCo]
       userCoList.push(this.props.userCo)
       this.setState({userCo: userCoList})
       console.log("les apiculteurs",userCoList)
    }
    // state = {
       
    // };
    
    render(){
        // console.log("les apiculteurs",userCoList)
        return(
            <MapContainer
                center={[this.state.lat, this.state.lng]}
                zoom={13}
                scrollWheelZoom={true}
                id="mapId">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker effectOn={this} />
            </MapContainer>
        )
    }

}


export default Map;