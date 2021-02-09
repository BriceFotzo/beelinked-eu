import React, { Component } from 'react';
import Rucher from './Ruchers';
import RucherForm from './RucherForm';
import {
  MDBRow,
} from "mdbreact";
import axios from "axios";
const env = require('../../../config');

class Mesruchers extends Component {
  state = {
    title: 'Liste de vos ruchers',
    idUserConnected: "",
    beehouses: [],
    userStatus: JSON.parse(localStorage.getItem('userCo')).Statut
  };


  async componentWillMount() {
    let userCo = JSON.parse(localStorage.getItem('userCo'));
    console.log("userco", userCo)
    axios.post(env.serverPath+':'+env.serverPort+'/login/', { Email: userCo.Email, Password: userCo.Mdp }).then(
      res => {
        if (res.data.message == null) {
          // id = res.data[0].idUser
          this.setState({ idUserConnected: res.data[0].idUser })
          console.log("state idUserConnected", this.state.idUserConnected)
          const dataResearch = {
            idUser: this.state.idUserConnected
          };
          console.log("datasearch", this.state.idUserConnected)
          axios.post(env.serverPath+':'+env.serverPort+'/getAllRuchersByIdUser', dataResearch).then((res) => {
            console.log(res.data);
      
            let listbeehouses = [...this.state.beehouses];
      
            res.data.map((element) => {
              listbeehouses.push(
                { id: element.idRucher, name: element.nom, number_of_hives: element.nbre_Ruches, long: element.longitude, lat: element.latitude, address: element.Adresse }
              )
            });
      
            console.log(this.state.beehouses);
            this.setState({
              beehouses: listbeehouses
            });
          })
        }
      });

   
  }
  addbeehouse = async (beehouse) => {
    const beehouses = [...this.state.beehouses];
    const number_of_hives_to_add = beehouse.number_of_hives;
    const IdOwner = this.state.idUserConnected;

    beehouse.IdOwner = IdOwner
    //  ajout du rucher dans la BDD
    await axios.post(env.serverPath+':'+env.serverPort+'/addRucher/', beehouse).then(
      res => {
        console.log(res)
        beehouses.push(beehouse);
        this.setState({ beehouses: beehouses });

      }).catch((err) => {
        console.log("Erreur lors de l'ajout du rucher : ", err)
      })




    //    Récupération de l'id max de la table rucher pour rajouter un usedBy 
    //      qui permet de faire le lien entre un utilisateur et son rucher 
    axios.get(env.serverPath+':'+env.serverPort+'/idRucherMax').then(res1 => {

      const id = res1.data[0].MaxIdRucher;

      const dataRucheToadd = { RucherId: id }
      //    Ajout de number_of_hives_to_add ruches 
      if (number_of_hives_to_add > 0) {


        for (var i = 0; i < number_of_hives_to_add; i++) {
          // console.log(i)

          axios.post(env.serverPath+':'+env.serverPort+'/addRuche/', dataRucheToadd).then(
            res => {
              console.log(res)

            }).catch((err) => {
              console.log("Erreur lors de l'ajout de la ruche : ", i + 1, " ", err)
            })

        }

      }


      const dataAddUsedBy = { idRucher: id, idUser: this.state.idUserConnected }

      // ajout de la ligne usedBy dans la BDD

      axios.post(env.serverPath+':'+env.serverPort+'/addUsedBy/', dataAddUsedBy).then(res2 => {
        console.log(res2.status)

        //création des number_of_hives_to_add ruches à ajouter à al BDD. 


      }).catch((err2) => {
        console.log("Erreur lors de la création de usedBy:", err2)
      })


    }).catch((err1) => {
      console.log("Erreur lors de la récupération de l'id de rucher max :", err1)
    });




  }



  render() {
    console.log("status", this.state.userStatus)
    return (
      <div>
        <div className="row justify-content-center" style={{ backgroundColor: '#282c34' }}>
          <MDBRow className="col-9 justify-content-center">
            <h1 className="h1-responsive font-weight-bold my-5" style={{ color: 'white' }}>
              {this.state.title}
            </h1>
          </MDBRow>
          <MDBRow className="text-center justify-content-center col-9">
            {this.state.beehouses.map((beehouse) => (
              <Rucher key={beehouse.id} details={beehouse} />
            ))}
            <RucherForm handleChange={this.addbeehouse} > </RucherForm>
          </MDBRow>
        </div>
      </div>
    );
  }
}
export default Mesruchers;