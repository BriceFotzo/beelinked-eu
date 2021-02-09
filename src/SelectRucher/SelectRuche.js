import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import axios from "axios";
import { withRouter, BrowserRouter as Router } from 'react-router-dom';
const env = require('../config');

class PageCompleter extends React.Component{
  render(){
    var items = [];
        for (var i = 0; i < 4-this.props.length%4; i++) {
            items.push(i);            
        }
    return(
      items.map(()=>{
        return(
          <div class="col-sm-3" style={{width:'300px', padding:'5px', margin :'5px auto' }}></div>
         );
      })
    );
  }
}




class RuchePage extends React.Component {
    state = {
      Email: "",
      idRucher:"",
      Ruches:[],
    };
  
    changeHandler = event => {
      this.setState({ [event.target.name]: { value: event.target.value } });
    };
  
    clickHandler = async event => {
      if (true) {
        this.setState({ napi: { valid: true }, titulaire: { valid: true } });
        let data = { id: this.state.idRucher, napi: this.state.napi.value };
        await axios.put(env.serverPath+':'+env.servPort+'/update/', data);
      }
  
    };
  

    async componentDidMount() {
      let idRucher = this.props.match.params.idRucher;
      //console.log('sad',idRucher);
      let userCo = JSON.parse(localStorage.getItem('userCo'));
      let res = await axios.get(env.serverPath+':'+env.servPort+'/ruchesOfRucher/'+idRucher);
      let ruches = res.data.map((item,index)=>{
        item.id_ruche = res.data[index].id_ruche;
        item.nom_ruche = res.data[index].nom_ruche;
        item.nbre_cadres = res.data[index].nbre_cadres;
        item.taille = res.data[index].taille;
        item.numero_serie = res.data[index].numero_serie;
        item.valeur = res.data[index].valeur;
        return item;             
      });
      this.setState({
        Email : userCo.Email,
        idRucher: idRucher,
        Ruches: ruches
      });
       console.log('ad',this.state.Ruches);
    };
  
    render() {
       return(
          <div class="row">
          {this.state.Ruches.map((item)=>{ 
          return ( 
            <div class="col-sm-3" style={{width:'300px', padding:'5px', margin :'5px auto' }}>
            <div className="card text-center"  Style="border: 10px solid #3369FF ">
                <div className="card-body">
                    <h5 className="card-title">{item.nom_ruche}</h5>
                    <p className="card-text"> <h2>{item.nbre_cadres}</h2> cadres </p>
                    <p className="card-text"> Taile : {item.taille} </p>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-outline-primary">Voir rapports</button> 
                    <button type="button" className="btn btn-outline-danger">Voir détails</button>
                </div>
            </div>
        </div>
           );
          })} 
         <PageCompleter length={this.state.Ruches.length}/>
          </div>
       );
    }
    
  }

  export default withRouter(RuchePage);
