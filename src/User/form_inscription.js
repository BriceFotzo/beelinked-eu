import React from "react";
import {  MDBRow, MDBBtn, MDBInput } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Axios from "axios";
const env = require('../config');

class FormInscription extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
           
      idUser: "3",
      user: [],
      checked: false,
      validNom: false,
      validPrenom: false,
      validEmail: false,
      ValidPassword: false,
      validPassword2: false,
      validNAPI: false,
      validAdresse1: false,
      validAdresse2: false,
      validCodeP : false,
      validVille : false,
      validTypeMiel:false
    }
    this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange (e) {
        this.setState({
            checked : e.target.checked
        })
    }


    changeHandler = event => {
      this.state.user[event.target.name] = event.target.value;
      let tmp = 'valid' + event.target.name;
      //console.log(tmp);
      if (event.target.name !== 'NAPI' && event.target.value !==''){
        this.setState({ [tmp] : true });
      }
      else if (event.target.name !== 'NAPI' && event.target.value ==''){
        this.setState({[tmp]: false});
      }
      else if (event.target.name === 'NAPI' && event.target.value[0]==='A' && event.target.value.length === 8 && !isNaN(event.target.value.substring(1,9))){
        this.setState({[tmp]: true});
      }
      else if (event.target.name === 'NAPI'){
        this.setState({[tmp]: false});
      }

      };
  
    handleSubmit = async event => {
        
        if (this.state.checked == true ){
            if (this.state.validNAPI === true && this.state.validAdresse1 === true && this.state.validAdresse2 === true && this.state.validTypeMiel === true && this.state.validCodeP === true && this.state.validVille === true) {
                let data = { Nom: this.state.user.Nom, Prenom: this.state.user.Prenom, Email: this.state.user.Email, Password: this.state.user.Password, NumeroNAPI: this.state.user.NAPI, Adresse1: this.state.user.Adresse1, Adresse2: this.state.user.Adresse2, CodeP: this.state.user.CodeP, Ville: this.state.user.Ville, TypeMiel: this.state.user.TypeMiel };
                console.log("form data", data)
                Axios.post(env.serverPath+':'+env.serverPort+'/registerNAPI/', data)
            }
        }else{
                
                let data = { Nom: this.state.user.Nom, Prenom: this.state.user.Prenom, Email: this.state.user.Email, Password: this.state.user.Password};
                Axios.post(env.serverPath+':'+env.serverPort+'/register/', data)
            }
        
    };
  
    render() {
        return (
          <div class="container justify-content-center" >
            <form class="text-center" onSubmit={this.handleSubmit} action="/" >
                <h3 style={{ color: 'white' }}>Inscription</h3>
                <MDBRow Style="margin-bottom  : 15px">
                    <input
                    value={this.state.user.Nom}
                    class="col-10"
                    className={ this.state.validNom ? "form-control is-valid" : "form-control is-invalid"}
                    name="Nom"
                    type="text"
                    onChange={this.changeHandler}
                    id="defaultFormRegisterNameEx"
                    placeholder="Nom"
                    required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                    <input
                    value={this.state.user.Prenom}
                    class="col-10"
                    className={ this.state.validPrenom ? "form-control is-valid" : "form-control is-invalid"}
                    name="Prenom"
                    type="text"
                    onChange={this.changeHandler}
                    id="defaultFormRegisterNameEx"
                    placeholder="Prenom"
                    required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                    <input
                    value={this.state.user.Email}
                    class="col-10"
                    className={ this.state.validEmail ? "form-control is-valid" : "form-control is-invalid"}
                    name="Email"
                    type="email"
                    onChange={this.changeHandler}
                    id="defaultFormRegisterNameEx"
                    placeholder="Email"
                    required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                    <input
                    value={this.state.user.Password}
                    class="col-10"
                    className={ this.state.validPassword ? "form-control is-valid" : "form-control is-invalid"}
                    name="Password"
                    type="password"
                    onChange={this.changeHandler}
                    id="defaultFormRegisterNameEx"
                    placeholder="Password"
                    required
                />
                </MDBRow>
                <MDBRow Style="margin-bottom  : 15px">
                    <input
                    value={this.state.user.Password2}
                    class="col-10"
                    className={ this.state.validPassword2 ? "form-control is-valid" : "form-control is-invalid"}
                    name="Password2"
                    type="password"
                    onChange={this.changeHandler}
                    id="defaultFormRegisterNameEx"
                    placeholder="Confirm Password"
                    required
                />
                </MDBRow> 
                <div class="custom-control custom-checkbox" Style="margin-bottom : 15px">
                <label htmlFor="nom" style={{ color: 'white' }}>Vous êtes apiculteur ? {' '}</label>
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
                </div>    
                    {this.state.checked ? 
                    <div Style="display:block">
                        <MDBRow Style="margin-bottom  : 15px">
                        <input
                        value={this.state.user.NAPI}
                        class="col-10"
                        className={ this.state.validNAPI ? "form-control is-valid" : "form-control is-invalid"}
                        name="NAPI"
                        type=""
                        onChange={this.changeHandler}
                        id="defaultFormRegisterNameEx"
                        placeholder="NAPI"
                        
                        />
                        </MDBRow>
                        <MDBRow Style="margin-bottom  : 15px" >
                        <small id="emailHelp" className="form-text text-muted">
                        Le Numéro NAPI est unique à chaque apiculteur, délivré à la première déclaration du rucher à la Direction Génrale de l'Alimentation (DGAL).
                        </small>
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
                        
                        />
                        </MDBRow>
                        <MDBRow Style="margin-bottom  : 15px">
                        <input
                        value={this.state.user.CodeP}
                        class="col-10"
                        className={ this.state.validCodeP ? "form-control is-valid" : "form-control is-invalid"}
                        name="CodeP"
                        type="text"
                        onChange={this.changeHandler}
                        id="defaultFormRegisterNameEx"
                        placeholder="Code postal"
                        
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
                        
                        />
                        
                    </MDBRow>
                    <div class="custom-control custom-checkbox" Style="margin-bottom : 15px">
                        
                        <label htmlFor="nom" style={{ color: 'white' }}>Partager ma localisation ? {" "}</label>
                        <input type="checkbox"/>
                    </div>    
              </div>:null}
              <MDBBtn outline color="primary" type="submit" Style="float:right" >Valider</MDBBtn>
            </form>
          </div>
        );
    }
}

  export default FormInscription;