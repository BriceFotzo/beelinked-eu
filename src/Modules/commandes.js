import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import CommandeForm from "../components/commandeForm";


class Commande extends React.Component {
  state = {
    userStatus: JSON.parse(localStorage.getItem('userCo')).Statut
  }
  render() {
    return (
      <div class="jumbotron ">
        <MDBContainer className="justify-content-center">
          <MDBRow Style="margin-top : 105px ">
            <MDBCol md="3"></MDBCol>
            <MDBCol md="6" className="border rounded becomeApiBox"><CommandeForm /></MDBCol>
            <MDBCol md="3"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
export default Commande;
