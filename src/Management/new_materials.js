import React, {Component} from "react"; 
import axios from "axios";
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdbreact';
const env = require('../config');

class MaterialsNew extends Component{
    state = {
        nomNouveauMateriel :'',
        stockNouveauMateriel :0, 
        seuilNouveauMateriel : 0,
        userId: ''
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        let res = await axios.get(env.serverPath+':'+env.serverPort+'/userId/'+JSON.parse(localStorage.getItem('userCo')).Email)
        let idUser = res.data
        console.log(idUser);
        await this.setState({ userId: idUser[0].idUser })
        //console.log(this.state.userId)
        let data ={Nom : this.state.nomNouveauMateriel, Stock : this.state.stockNouveauMateriel, Seuil : this.state.seuilNouveauMateriel, UserId : this.state.userId};
        console.log(data);
        await axios.post(env.serverPath+':'+env.serverPort+'/newMateriel', data); 
    }

    handleChange = (event) => {

        if (event.target.id === "nom") {
            this.setState({ nomNouveauMateriel: event.currentTarget.value });
        } else if (event.target.id === "stock") {
            this.setState({ stockNouveauMateriel: event.currentTarget.value });

        }
        else if (event.target.id === "seuil") {
            this.setState({ seuilNouveauMateriel: event.currentTarget.value });
        }
    }

    render(){
        return (
            <div className=" text-center card_rucher" Style="margin-bottom : 10px">
                    <MDBRow>
                    <MDBCol style={{ maxWidth: "40rem" }}>
                    <MDBCard border="warning" style={{ borderWidth: '5px' }} reverse>
                        <MDBCardBody cascade className="text-center">
                        <form onSubmit={this.handleSubmit}>
                                <p className="h4 text-center mb-4">Ajouter un nouveau materiel</p>
                                    <input onChange={this.handleChange} id="nom" type="text" className="form-control" placeholder="Nom du materiel" required/>
                                <br/>
                                <label className="grey-text">
                                Stock actuel :
                                </label>
                                <input onChange={this.handleChange}  id="stock" type="number" min="0" placeholder ="Stock" required></input>
                                <br />
                                <label className="grey-text">
                                Seuil d'alerte :
                                </label>
                                <input onChange={this.handleChange}  id="seuil"  type="number" min="0" placeholder ="Seuil d'alerte" required></input>
                                <br/>
                                <MDBBtn color="warning" size="sm" type="submit">
                                    Ajouter
                                </MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    </MDBRow>
                    </div>
        )
       
    }
}
export default MaterialsNew;