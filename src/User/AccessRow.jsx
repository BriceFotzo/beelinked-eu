import React, { Component } from 'react';
import axios from "axios";
const env = require('../config');


class AccessRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disable: false
        }
    }



    handleAsk = (mail, pmdp) => {
        this.setState({disable: !this.state.disable})
        let idAsker = null;
        let idreceiver = null;
        let dataAsker = { Email: this.props.userCo.Email, Password: this.props.userCo.Mdp }
        let datareceiver = { Email: mail, Password: pmdp }
        this.setState({ disable: true })
        console.log(dataAsker, datareceiver)
        axios.post(env.serverPath+':'+env.serverPort+'/login/', dataAsker).then(
            res => {
                console.log("res asker", res.data[0].idUser)
                if (res.data.message == null) {
                    idAsker = res.data[0].idUser

                    axios.post(env.serverPath+':'+env.serverPort+'/login/', datareceiver).then(
                        res => {
                            console.log("res receiv", res.data[0].idUser)
                            if (res.data.message == null) {
                                idreceiver = res.data[0].idUser
                                const accessdata = {
                                    UserId_asker: idAsker,
                                    UseId_receiver: idreceiver
                                }
                                console.log(accessdata)
                                axios.post(env.serverPath+':'+env.serverPort+'/askAccess', accessdata).then(
                                    res => {
                                        this.setState({ disable: res.data })
                                        console.log("handleAsk resp: ", res);
                                    }
                                    , (error) => {
                                        console.log("il y a eu erreur: ", error);
                                    });
                            }
                        }
                        , (error) => {
                            console.log(error);
                        });



                }
            }
            , (error) => {
                console.log(error);
            });

        console.log("demande envoyée")

    }

    ToDisable = (mail, pmdp) => {

        let idAsker = null;
        let idreceiver = null;
        let dataAsker = { Email: this.props.userCo.Email, Password: this.props.userCo.Mdp }
        let datareceiver = { Email: mail}
        axios.post(env.serverPath+':'+env.serverPort+'/login/', dataAsker).then(
          res => {
            if (res.data.message == null) {
              idAsker = res.data[0].idUser
              // console.log("to disable idAsker", idAsker)
    
              axios.post(env.serverPath+':'+env.serverPort+'/getUserByMail/', datareceiver).then(
                res => {
                  // console.log("res receiv", res.data[0].idUser)
                  
                    idreceiver = res.data[0].idUser
                    // console.log("to disable idreceiver", idreceiver)
                    const accessdata = {
                      UserId_asker: idAsker,
                      UseId_receiver: idreceiver
                    }
                    axios.post(env.serverPath+':'+env.serverPort+'/existingaccess', accessdata)
                      .then((response) => {
                        // console.log("to disable response ", response.data);
                        this.setState({ disable: response.data })
                        // console.log(this.state)
                      }, (error) => {
                        console.log(error);
                      });
                  
                }
                , (error) => {
                  console.log(error);
                });
            }
          }
          , (error) => {
            console.log(error);
          });
    
      }
    
      async componentDidMount() {
        this.ToDisable(this.props.item.Email)
    
      }


    render() {
        return ( 
            // console.log("item", item.NAPI);
            <tr>
                <td>{this.props.item.Nom, " ", this.props.item.Prenom}</td>
                <td>{this.props.item.NAPI}</td>
                <td>{this.props.item.CP}</td>
                <td>{this.props.item.Telephone}</td>
                <td><button className="sm btn btn-amber" onClick={() => this.handleAsk(this.props.item.Email, this.props.item.Password)} disabled={this.state.disable}>Demander Accès</button></td>
            </tr>
        );
    }
}

export default AccessRow;