import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import FormInscription from "./form_inscription.js";


class inscriptionNAPI extends React.Component {
  render() {
    return (
      <div class="jumbotron ">
        <MDBContainer className="justify-content-center">
          <MDBRow Style="margin-top : 105px ">
            <MDBCol md="4"></MDBCol>
            <MDBCol md="4" ><FormInscription /></MDBCol>
            <MDBCol md="4"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
export default inscriptionNAPI;
