import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import axios from "axios";

class RucherForm extends Component {
    state = {
        check: false,
        newName: '',
        number_of_hives: '0',
        newHiveAddress: '',
        newLong: '',
        newLat: '', 
        Long:'', 
        Lat:'', 
       
    }

    componentDidMount() {
        this.GetCoords();
    }
    getCurrentGPSPosition = function () {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    GetCoords =()=>{
        this.getCurrentGPSPosition().then((position) => {
            this.setState({
                newLong: position.coords.longitude,  newLat: position.coords.latitude
            });
        });
    }

    handleChange = (event) => {

        if (event.target.id === "name") {
            this.setState({ newName: event.currentTarget.value });
        } else if (event.target.id === "address") {
            this.setState({ newHiveAddress: event.currentTarget.value });

        }
        else if (event.target.type === "number") {
            this.setState({ number_of_hives: event.currentTarget.value });
        }


    };
    checkAdresse=(coords)=>{
       

            let url0="https://api-adresse.data.gouv.fr/reverse/?"
            let url =url0+"lon="+coords.longitude+"&lat="+coords.latitude

            axios.get(url).then((response) =>  {
                console.log(response)
                this.setState({ newHiveAddress:response.data.features[0].properties.label })
                
              }).catch((err)=>{
                alert("Géolocalisation impossible:"+ err)
              })
    }
    checkCoords=(address)=>{
        let url0="https://api-adresse.data.gouv.fr/search/?q="
 
        let url =url0+address
        let coords
        
        axios.get(url).then((response) =>  {
            console.log(response)
            coords= response.data.features[0].geometry.coordinates
            this.setState({Long: coords[0], Lat: coords[1] });
            console.log("longitude :", coords[0],"latitude:",coords[1])
            
        }).catch((err)=>{
            console.log("ERREUR :", err)
        });
    }
    handleCheck = (event) => {
        if (this.state.check === true) {
            
            this.setState({ newHiveAddress:'',check: false })
            document.getElementById("address").disabled=false;
            
        } else if(this.state.check === false) {
            
            const coords={longitude:this.state.newLong,latitude:this.state.newLat}
            this.checkAdresse(coords);
            document.getElementById("address").disabled=true;
            let adresse=this.state.newHiveAddress
            console.log(adresse)
            this.setState({ check: true })     
        }

    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        const name = this.state.newName;
        const number_of_hives = this.state.number_of_hives;
        let address = this.state.newHiveAddress;

        
        if (address.length === 0) {
            this.setState({newLong: '', newLat: '' });
            address = "NA";
        }else {
           
            this.checkCoords(address)
        }
        var long = this.state.Long;
        var lat = this.state.Lat;
        
        this.props.handleChange({ name, number_of_hives, address, long, lat });
        this.setState({ newName: '', number_of_hives: '0', newHiveAddress:'',Long:'', Lat: '', check : false });
        document.getElementById("address").disabled=false;
        this.GetCoords();
    };

    render() {
        return (
            <div className="Ruchers" style={{ backgroundColor: '#FFC733', width: '300px', padding: '10px', margin: '5px 11.4px' }}>
                <div className="card text-center" >
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <p className="h4 text-center mb-4">Ajouter un rucher</p>
                            <input onChange={this.handleChange} value={this.state.newName} type="text" className="form-control" id="name" placeholder="nom du rucher" required />
                            <br />

                            <input onChange={this.handleChange} value={this.state.newHiveAddress} type="text" className="form-control" id="address" placeholder="adresse du rucher" required />

                            <label>
                                <span>utiliser position actuelle </span>
                                <input onChange={this.handleCheck} type="checkbox" name="mycheckbox" checked={this.state.check} />
                            </label>
                            <label className="grey-text">
                                nombre de ruches
                                </label>
                            <input onChange={this.handleChange} value={this.state.number_of_hives} type="number" min="0" placeholder="Nombre de ruches" required></input>
                            <br />
                           
                            <MDBBtn color="warning" size="sm" type="submit">
                                Valider
                                </MDBBtn>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}
export default RucherForm;