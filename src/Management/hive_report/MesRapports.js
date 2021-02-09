import React, { Component } from "react";
import RapportForm from './RapportForm';
import axios from "axios";
const env = require('../../config');

class MesRapports extends Component {

  constructor(){
    super()
    this.state={
        title: "Comptes-rendus de vos ruchers ",
        subtitle1: "Voir mes derniers comptes rendus",
        subtitle2: "Faire un nouveau compte rendu",
        showForm: false,
        showRapports: false,
        
        rapports: [],
        idUserConnected:'',
        userStatus:0
    }
  }
  
  async componentWillMount() {

    let userCo = JSON.parse(localStorage.getItem('userCo'));
    this.setState({userStatus: userCo.Statut});
    axios.post(env.serverPath+':'+env.serverPort+'/login/', { Email: userCo.Email, Password: userCo.Mdp }).then(
    res => {
      if (res.data.message == null) {
        // id = res.data[0].idUser
        this.setState({ idUserConnected: res.data[0].idUser })
        const dataResearch = {
          idOwner: res.data[0].idUser
        };

      axios.post(env.serverPath+':'+env.serverPort+'/getAllRapportsByIdOwner/', dataResearch).then((res) => {

      let listerapports = [...this.state.rapports];

      res.data.map((element) => {
        listerapports.push(
          { 
          intervention:element.nom,
          nom_rapport :'Rapport ' + element.nom_ruche,
          commentaire:element.Commentaire,
          days:element.days
          /*
          comportementAbeille:'',
          pctCouvain:'',
          activiteRuche:'',
          nbreCellulReines:'',
          uniformitePonte:'',
          pollen:'',
          frelon:'',
          presenceReine:'',
          essaimage:'',
          maladie:'',
          materielId:'',
          quantiteMateriel:'',
          nbreCadreCouvain:'',
          positionnement:'',
          autreIntervention:'',*/
          }
        )
      });

      this.setState({rapports: listerapports});
    });
  }
});
  }

  checkStockMAteriel = function (idMateriel, QuantiteModifier) {

    axios.post(env.serverPath+':'+env.serverPort+'/getMaterielById/', { idMateriel:idMateriel }).then(
    res => {
      if (res.data.message == null) {

          if(res.data[0].Stock- QuantiteModifier< res.data[0].Seuil){
            const dataToAdd = {
              message: res.data[0].Nom + 'est bienôt en rupture de stock.Quantité restante '+res.data[0].Stock- QuantiteModifier,
              userId:this.state.idUserConnected
            };

            axios.post(env.serverPath+':'+env.serverPort+'/getAllRapportsByIdOwner/', dataToAdd);

      }
    }
  });
}




  DisplayFormRapports(component){
    if(component==="Form"){
      this.setState({
        showForm: !this.state.showForm
      })
    }else if(component==="Rapports"){
      this.setState({
        showRapports: !this.state.showRapports
      })
    }
  }
  addReport = async (report) => {

    console.log(report)
    
      const listeRapports = [...this.state.rapports];
  
      //  ajout du rapport  dans la BDD
      await axios.post(env.serverPath+':'+env.serverPort+'/addRapport/', report.infoCR).then(
        res => {
          listeRapports.push(report);
          this.setState({ rapports: listeRapports });
          console.log("rapports state", this.state.rapports)
        }).catch((err) => {
          console.log("Erreur lors de l'ajout du rapport : ", err)
        })
        
      this.checkStockMAteriel(report.infoCR.materielId,report.infoCR.quantiteMateriel)
  
  };
  deleteReport = async (report) => {};
  updateReport = async (report) => {};

  render() {
    return (
      <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
        </div>

        <div className="App-header container-fluid col-9">
          
              <h1 className="h1-responsive font-weight-bold my-5" >
                {this.state.title}
              </h1>
              <div class="row justify content-center">
            <div className="col">
              <button type="button" class="btn btn-outline-success" onClick={()=>this.DisplayFormRapports("Rapports")} >  {this.state.subtitle1} </button>
            </div>
          </div>
          {
            this.state.showRapports ? 
           
          <div class="row justify-content-center">
          {this.state.rapports.map((rapport) => (
              <div class="card" style={{width:'250px', padding:'10px', margin :'5px 11.4px' }}>
                <div class="card text-center">
                  <div class="card-body">
                    <h5 class="card-title"> <strong>{rapport.nom_rapport}</strong></h5>
                    <p class="card-text">
                    {rapport.commentaire} 
                    </p>
                    <button type="button"  class="btn-sm btn-primary" id="ModalButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Plus d'infos </button>
                  </div>
                  <div class="card-footer text-muted">{rapport.days} days ago</div>
                </div>
              </div>
            ))}
          </div>
            :null
          }
         


          <div class="row justify content-center">
            <div className="col">
             <button type="button" class="btn btn-outline-warning" onClick={()=>this.DisplayFormRapports("Form")} >    {this.state.subtitle2} </button>
            </div>
          </div>
          <br/>
          <br/>
          {
            this.state.showForm ? 
            <RapportForm handleChange={this.addReport}></RapportForm>:null
          }
         
             
        </div>  
      </div>
      
    );
  }
  
}

export default MesRapports;
