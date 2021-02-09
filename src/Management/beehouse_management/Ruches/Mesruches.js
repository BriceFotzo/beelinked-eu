
import React, { Component } from 'react';
import { MDBRow } from "mdbreact";
import Ruche from './Ruches';
import RucheForm from './RucheForm';
import axios from "axios";
const env = require('../../../config');

class Mesruches extends Component {


  state = {
    //nomRucher: this.props.nom,
    idUserConnected: 1,//à modifier
    idRucherSelected: this.props.location.state,
    ruches: [],
    userStatus: JSON.parse(localStorage.getItem('userCo')).Statut

  }

  async componentWillMount() {
    // Récupération de toutes les ruches dès le montage du composant 
    console.log("id rucher selected", this.state.idRucherSelected)
    const dataResearch = {
      idRucher: this.state.idRucherSelected
    };

    axios.post(env.serverPath+':'+env.serverPort+'/getAllRuchesByIdRucher/', dataResearch).then((res) => {
      console.log(res);

      let listeruches = [...this.state.ruches];

      res.data.map((element) => {
        listeruches.push(
          { id: element.id_ruche, name: element.nom_ruche, taille: element.taille, nbreCadres: element.nbre_cadres, numSerie: element.numero_serie, typeRucheName: element.valeur }
        )
      });

      console.log(this.state.ruches);
      this.setState({
        ruches: listeruches
      });
    })
  }

  addHive = async (hive) => {
    const listeruches = [...this.state.ruches];
    const idRucher = this.state.idRucherSelected;

    hive.RucherId = idRucher
    //  ajout de la ruche dans la BDD
    await axios.post(env.serverPath+':'+env.serverPort+'/addRuche/', hive).then(
      res => {
        console.log("addhive", res)
        listeruches.push(hive);
        this.setState({ ruches: listeruches });

      }).catch((err) => {
        console.log("Erreur lors de l'ajout de la ruche : ", err)
      })

  }


  render() {
    return (
      <div>
        <div className="row justify-content-center" style={{ backgroundColor: '#282c34' }}>

          <MDBRow className="col-9 justify-content-center">
            <h1 className="h1-responsive font-weight-bold my-5" style={{ color: 'white' }}>
              Liste des ruches
            </h1>
          </MDBRow>
          <MDBRow className="text-center justify-content-center col-9">
            {this.state.ruches.map((ruche) => (
              <Ruche key={ruche.id} details={ruche} />
            ))}
          </MDBRow>
          <MDBRow className="col-9 justify-content-center">
            <RucheForm handleChange={this.addHive}></RucheForm>
          </MDBRow>
        </div>

      </div>
    )

  }
}
export default Mesruches;