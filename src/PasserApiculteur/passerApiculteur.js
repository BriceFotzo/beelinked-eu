import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import FormsPage from "./Form.js";


class PasserApiculteur extends React.Component {
  render() {
    return (
      <div class="jumbotron ">
        <MDBContainer className="justify-content-center">
          <MDBRow Style="margin-top : 105px ">
            <MDBCol md="3"></MDBCol>
            <MDBCol md="6" className="border rounded becomeApiBox"><FormsPage /></MDBCol>
            <MDBCol md="3"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
export default PasserApiculteur;
