import React, { useState, useEffect, Component } from 'react';
import { MDBTypography } from 'mdbreact';
import axios from "axios";
const env = require('../config');

class ApiMapInfo extends Component {

  constructor(props) {
    super(props);
    // console.log("props of butt", this.props)
    let dictToPrint = { NAPI: this.props.NAPI, Adresse: this.props.Adresse, Email: this.props.Email, nbRuchers: this.props.nbRuchers, nbRuches: this.props.Ruches, TypeMiel: this.props.TypeMiel, cp: this.props.CP, Ville: this.props.Ville, telephone: this.props.Telephone }
    this.state = {
      result: dictToPrint,
      disable: false
    }
  }

  componentWillMount() {
    console.log("props of butt", this.props)

  }
  handleAsk = (mail) => {
    let idAsker = null;
    let idreceiver = null;
    let dataAsker = { Email: mail }
    let datareceiver = { Email: this.props.Email }
    this.setState({ disable: true })
    axios.post(env.serverPath+':'+env.serverPort+'/getUserByMail/', dataAsker).then(
      res => {
        console.log("res asker", res.data[0].idUser)
        if (res.data.message == null) {
          idAsker = res.data[0].idUser

          axios.post(env.serverPath+':'+env.serverPort+'/getUserByMail/', datareceiver).then(
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
    this.ToDisable(this.props.Email)

  }



  render() {
    return (
      <div>
        <div className="ApiDetails">
          {Object.entries(this.state.result).map((item, idx) =>

            item[1] == undefined ? "" :
              <div >
                <MDBTypography className="ApiDetailsTypo" type="display3"  >
                  <span className="ApiDetailsTitle">{item[0]}:</span>  {item[1]}
                </MDBTypography>

              </div>

          )}
          <button className="btn-sm btn btn-amber" onClick={() => this.handleAsk(this.props.userCo.Email)} disabled={this.state.disable}>Demander Accès</button>
          { }

        </div>
      </div>
    );
  }
}

export default ApiMapInfo;






