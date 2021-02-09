import React from "react";
import { Link, MDBBtn } from "mdbreact";
import axios from "axios";
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import moment from 'moment';
const env = require('../config');

class FormsPage extends React.Component {
    state = {
      Email: "",
      user: [],
      modal: false,
      date: "",
      title:"",
      text:"",
      validNAPI: false,
      validAdresse1: false,
      validAdresse2: false,
      validTelephone :false,
      validCP : false,
      validVille : false,
      validTypeMiel:false,
    };

      
    toggle = () => {
      this.setState({
         modal: !this.state.modal
       });
    }
    
    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value },()=>console.log(this.state[event.target.name]));
    }


    clickHandler = async event => {
        let data ={title:  this.state.title ,text : this.state.text, date: moment().format("YYYY-MM-DD HH:mm:ss") ,user : this.state.user};
        console.log('data',data);
        await axios.post(env.serverPath+':'+env.serverPort+'/forum/sujet', data);
        this.setState({
            modal: !this.state.modal
          });
    }

    async componentDidMount() {
     let userCo = JSON.parse(localStorage.getItem('userCo'));
     if (userCo !== null){ 
        let res = await axios.get(env.serverPath+':'+env.serverPort+'/user/mail/' + userCo.Email);
        this.setState({ 
            Email : userCo.Email,
            user: res.data[0]
          },()=>console.log('aa',this.state));
     }
     console.log('aa',this.state); 
    }
  
    render() {
        if ( this.state.Email !== ""){
            return(
                <div>
                    <MDBBtn color=" grey"   onClick={this.toggle}>Redaction</MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Ecriture</MDBModalHeader>
                        <MDBModalBody>
                        <form>
                      <label
                        htmlFor="defaultFormCardNameEx"
                        className="grey-text font-weight-light"
                      >
                        Sujet
                      </label>
                      <input
                        value={this.state.title}
                        type="text"
                        id="defaultFormCardNameEx"
                        className="form-control"
                        onChange={this.changeHandler}
                        name="title"
                      />
                      <br />
                      <label
                        htmlFor="defaultFormCardEmailEx"
                        className="grey-text font-weight-light"
                      >
                        Texte
                      </label>
                      <textarea
                        value={this.state.text}
                        id="defaultFormCardEmailEx"
                        className="form-control"
                        onChange={this.changeHandler}
                        name="text"
                        Style="height:10rem"
                      />            
                    </form>
                        </MDBModalBody>
                      <MDBModalFooter>
                          <MDBBtn color="primary" onClick={this.clickHandler}>Soumettre</MDBBtn>
                      </MDBModalFooter>
                  </MDBModal>
                </div>
            );
        }
        else {
            return(
              <div>
                <MDBBtn color=" grey"><Link to="/connection">Redaction</Link></MDBBtn>
              </div>
            );
          
        }
      
    }
  }

  export default FormsPage  ;