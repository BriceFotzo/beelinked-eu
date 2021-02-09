import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ComponentRucher from "./ComponentRucher.js";



class PageRucher extends React.Component {

  render() {
    return (
      <div>
        <MDBContainer className="justify-content-center">
          
          <MDBRow Style="margin-top : 85px ">
            <MDBCol md="2"></MDBCol>
            <MDBCol md="8"><ComponentRucher /></MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
export default PageRucher;
