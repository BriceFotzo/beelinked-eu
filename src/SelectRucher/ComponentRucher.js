import React from "react";
import {  MDBRow, MDBCol, MDBBtn ,MDBAutocomplete} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import RucherPage from "./SelectRucher.js";
import axios from "axios";
import "./style.css"
import Autocomplete from '@material-ui/lab/Autocomplete';

const env = require('../config');

class ComponentRucher extends React.Component {
    state={
      Email:"",
      nomUser:"",
      data: [],
    }
  
  
 clickHandler= event=>{
  let userCo = JSON.parse(localStorage.getItem('userCo'));
  this.setState({Email : userCo.Email},
  ()=>console.log());
}

logValue = async value => {
  let res = await axios.get(env.serverPath+':'+env.serverPort+'/'); 
  res.data.map((item,index)=>{
    if((res.data[index].Nom+' '+res.data[index].Prenom) === value  && res.data[index].Statut === 'apiculteur'){
      //id = res.data[index].idUser;
      this.setState({
        Email: res.data[index].Email,
        nomUser : value,
      },
        ()=>console.log('state',this.state));
    }
  });
};

async componentWillMount(){
   let data =[];
   await axios.get(env.serverPath+':'+env.serverPort+'/').then((res)=>{
      res.data.map((item,index)=>{
      if (res.data[index].Statut === 'apiculteur'){
        data.push(res.data[index].Nom+' '+res.data[index].Prenom);
      }            
    });
  })

  let userCo = JSON.parse(localStorage.getItem('userCo'));
  
  this.setState({
    Email: userCo.Email,
    data : data
  }, 
    ()=> console.log('idinital',this.state)); 
}


  render() {
    return (
      <div>
          <MDBRow>
            <MDBCol md="1"></MDBCol>
            <MDBCol md="6">
            <Autocomplete
              options={this.state.data}
              label="Chercher un apiculteur"
              clear
              id="input"
              renderInput={this.logValue}
            />   
            </MDBCol>
            <MDBCol md='5'>             
             <MDBBtn  size="sm" Style="top: 30px"  name='myRucher' outline color="info" onClick={this.clickHandler}>mes ruchers</MDBBtn>
            </MDBCol>
          </MDBRow> 
          <RucherPage Email={this.state.Email}/>       
      </div>
    );
  }
}
export default ComponentRucher;
