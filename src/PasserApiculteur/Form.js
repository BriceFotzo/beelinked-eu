import React from "react";
import {  MDBRow, MDBBtn, MDBInput } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from "axios";
const env = require('../config');

class FormsPage extends React.Component {
    state = {
      Email: "",
      user: [],
      validNAPI: false,
      validAdresse1: false,
      validAdresse2: false,
      validTelephone :false,
      validCP : false,
      validVille : false,
      validTypeMiel:false,
    };
  
    changeHandler = event => {

      //this.setState({user : { [event.target.name]: event.target.value }});
      this.state.user[event.target.name] = event.target.value;
      let tmp = 'valid' + event.target.name;
      //console.log(this.state.user.NAPI);

      //console.log(event.target.name === 'Telephone' && event.target.value[0]==='0' && event.target.value.length === 10 && !isNaN(event.target.value));
      console.log(this.state.user);
      if (event.target.name !== 'NAPI' && event.target.name !== 'Telephone'){
        if (event.target.value !==''){
          this.setState({ [tmp] : true },()=>console.log());
        }
        else{
          this.setState({[tmp]: false},()=>console.log());
        }
      }

      if (event.target.name === 'NAPI'){
        if (event.target.value[0]==='A' && event.target.value.length === 8 && !isNaN(event.target.value.substring(1,9))){
          this.setState({[tmp]: true},()=>console.log());
        }
        else{
          this.setState({[tmp]: false},()=>console.log());
        }
      }

      if (event.target.name === 'Telephone'){
        if( event.target.value[0]==='0' && event.target.value.length === 10 && !isNaN(event.target.value)){
          this.setState({[tmp]: true},()=>console.log(this.state));
        }
        else{
          this.setState({[tmp]: false},()=>console.log());
        }
      }
      //console.log(this.state);
      //console.log(this.state.user.[event.target.name]);
      //console.log(this.state);
      //console.log('tmp',this.state.validNAPI,this.state.validAdresse1,this.state.validAdresse2,this.state.validTypeMiel,this.state.validCodeP,this.state.validVille);
    };
  
    clickHandler = async event => {
      if (this.state.user['mapIsActive'] === null){
        this.state.user['mapIsActive'] =0;
      }  
      console.log("asd",this.state.user['mapIsActive']);
      //let res = await axios.get('http://localhost:3000/user/Napi/' + this.state.user.NAPI);

      //res.data.user.length === null  && 
      //A1234567
      if (this.state.validNAPI === true && this.state.validAdresse1 === true && this.state.validAdresse2 === true && this.state.validTelephone ===true && this.state.validTypeMiel === true && this.state.validCP === true && this.state.validVille === true) {
        let data ={Email : this.state.Email, user : this.state.user};
        console.log('data',data);
        await axios.put(env.serverPath+':'+env.serverPort+'/update/', data);
        //this.props.history.push('/');
      }
      else {
        console.log('invalid');
      }
    };
  

    checkHandler =  event =>{
      if (event.target.checked === true){
        this.state.user['mapIsActive'] = 1;
      }
      else{
        this.state.user['mapIsActive'] = 0;
      }    
      //console.log("ismap",this.state.user['mapIsActive']);
    }
    
    async componentDidMount() {
      let userCo = JSON.parse(localStorage.getItem('userCo'));
      console.log('userCo',userCo.Email);
      //<Redirect from='/passerApiculteur' to='/pageUser'></Redirect>
      //console.log(localStorage.getItem('userC') );
      //let idUser = 3;
      let res = await axios.get(env.serverPath+':'+env.serverPort+'/user/mail/' + userCo.Email);
     // this.state.user = res.data[0];
      this.setState({ 
        Email : userCo.Email,
        user: res.data[0]
      },()=>console.log('aa',this.state));
          /*this.setState({
        idUser: user[0].idUser,
        nom: user[0].Nom,
        prenom: user[0].Prenom,
        address: user[0].Email,
        statut: user[0].statut
      });*/

      if (this.state.user.NAPI !== null)
        this.setState({validNapi: true});
      
       //console.log(this.state);

    }
  
    render() {
      if (this.state.user.NAPI !== "" && this.state.validNapi  === true) {
        return (
          <div>
            <MDBRow Style="margin-bottom : 15px">
              <h4>Information personnelle</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h6>Nom : {this.state.user.Nom}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h6>Prénom : {this.state.user.Prenom}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h4>Adresse1</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h6>{this.state.user.Adresse1}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h4>Adresse2</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h6>{this.state.user.Adresse2}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h4>Téléphone</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h6>{this.state.user.Telephone}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h4>TypeMiel</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom  : 15px">
              <h6>{this.state.user.TypeMiel}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h4>Code postal: {this.state.user.CP}</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h4>Ville: {this.state.user.Ville}</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h4>Statut: {this.state.user.Statut}</h4>
            </MDBRow>
            <form >
              <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.NAPI}
                  className="form-control is-valid"
                  type="text"
                  disabled
                />
                <small id="emailHelp" className="form-text text-muted">
                  Le Numéro NAPI est unique à chaque apiculteur, délivré à la première déclaration du rucher à la Direction Génrale de l'Alimentation (DGAL).
                  </small>
              </MDBRow>
            </form>
          </div>
  
        );
  
      }
      else {
        return (
          <div class="container justify-content-center">
            <MDBRow Style="margin-bottom : 15px">
              <h4>Information personnelle</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h6>Nom : {this.state.user.Nom}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h6>Prénom : {this.state.user.Prenom}</h6>
            </MDBRow>
            <MDBRow Style="margin-bottom : 15px">
              <h4>Statut: {this.state.user.Statut}</h4>
            </MDBRow>
            <MDBRow Style="margin-bottom : 10px">
              <p className="cyan-text">Vous avez le numéro NAPI? Passez à Apiculteur!</p>
            </MDBRow>
            <form>
              <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.NAPI}
                  class="col-10"
                  className={ this.state.validNAPI ? "form-control is-valid" : "form-control is-invalid"}
                  name="NAPI"
                  type="text"
                  onChange={this.changeHandler}
                  id="defaultFormRegisterNameEx"
                  placeholder="NAPI"
                  required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.TypeMiel}
                  class="col-10"
                  className={ this.state.validTypeMiel ? "form-control is-valid" : "form-control is-invalid"}
                  name="TypeMiel"
                  type="text"
                  onChange={this.changeHandler}
                  id="defaultFormRegisterNameEx"
                  placeholder="TypeMiel"
                  required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.Adresse1}
                  class="col-10"
                  className={ this.state.validAdresse1 ? "form-control is-valid" : "form-control is-invalid"}
                  name="Adresse1"
                  type="text"
                  onChange={this.changeHandler}
                  id="defaultFormRegisterNameEx"
                  placeholder="Adresse1"
                  required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.Adresse2}
                  class="col-10"
                  className={ this.state.validAdresse2 ? "form-control is-valid" : "form-control is-invalid"}
                  name="Adresse2"
                  type="text"
                  onChange={this.changeHandler}
                  id="defaultFormRegisterNameEx"
                  placeholder="Adresse2"
                  required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.Telephone}
                  class="col-10"
                  className={ this.state.validTelephone ? "form-control is-valid" : "form-control is-invalid"}
                  name="Telephone"
                  type="text"
                  onChange={this.changeHandler}
                  id="defaultFormRegisterNameEx"
                  placeholder="Telephone number"
                  required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.CP}
                  class="col-10"
                  className={ this.state.validCP ? "form-control is-valid" : "form-control is-invalid"}
                  name="CP"
                  type="text"
                  onChange={this.changeHandler}
                  id="defaultFormRegisterNameEx"
                  placeholder="Code postal"
                  required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                <input
                  value={this.state.user.Ville}
                  class="col-10"
                  className={ this.state.validVille ? "form-control is-valid" : "form-control is-invalid"}
                  name="Ville"
                  type="text"
                  onChange={this.changeHandler}
                  id="defaultFormRegisterNameEx"
                  placeholder="Ville"
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  Le Numéro NAPI est unique à chaque apiculteur, délivré à la première déclaration du rucher à la Direction Génrale de l'Alimentation (DGAL).
                  </small>
              </MDBRow>
              <div class="custom-control custom-checkbox" Style="margin-bottom  : 15px">
                 <input type="checkbox" class="custom-control-input" id="defaultUnchecked" onChange={this.checkHandler}/>
                 <label class="custom-control-label" for="defaultUnchecked">Partager ma localisation</label>
              </div>
              <MDBBtn outline color="elegant" type="submit" Style="float:right" onClick={this.clickHandler}>Valider</MDBBtn>
            </form>
          </div>
        );
      }
    }
  }

  export default FormsPage  ;